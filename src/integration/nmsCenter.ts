import { ToastService } from "../services/common/toastService";

export const navigateToNmsCenterEggDelivery =
  (toastService: ToastService) => (json: string) => {
    const jsonObj = JSON.parse(json);
    const encoded = minifyPetJson(jsonObj);

    const url = `https://nomansapp.com/?service=egg&base64=${encoded}`;

    try {
      window.open(url, "_blank")!.focus();
      return;
    } catch {}

    navigator?.clipboard?.writeText?.(url)?.then?.(() => {
      toastService.warn(
        "Something went wrong but the url was copied to your clipboard. Please open a new tab and paste the url",
        {
          autoClose: false,
        }
      );
    });
  };

export const minifyPetJson = (jsonObj: any): string => {
  let encoded = btoa(JSON.stringify(jsonObj));
  const maxLength = 1800;

  if (encoded.length > maxLength) {
    jsonObj.CustomName = "";
    jsonObj.CustomSpeciesName = "";

    encoded = btoa(JSON.stringify(jsonObj));
  }

  if (encoded.length > maxLength) {
    jsonObj.Scale = Number(jsonObj.Scale.toFixed(2));
    jsonObj.Traits[0] = Number(jsonObj.Traits[0].toFixed(2));
    jsonObj.Traits[1] = Number(jsonObj.Traits[1].toFixed(2));
    jsonObj.Traits[2] = Number(jsonObj.Traits[2].toFixed(2));
    jsonObj.Moods[0] = Number(jsonObj.Moods[0].toFixed(2));
    jsonObj.Moods[1] = Number(jsonObj.Moods[1].toFixed(2));

    encoded = btoa(JSON.stringify(jsonObj));
  }

  if (encoded.length > maxLength) {
    if (jsonObj.CreatureSeed[1].startsWith("0x00"))
      jsonObj.CreatureSeed[1] = "0x00";
    if (jsonObj.CreatureSecondarySeed[1].startsWith("0x00"))
      jsonObj.CreatureSecondarySeed[1] = "0x00";
    if (jsonObj.SpeciesSeed[1].startsWith("0x00"))
      jsonObj.SpeciesSeed[1] = "0x00";
    if (jsonObj.GenusSeed[1].startsWith("0x00")) jsonObj.GenusSeed[1] = "0x00";
    if (jsonObj.ColourBaseSeed[1].startsWith("0x00"))
      jsonObj.ColourBaseSeed[1] = "0x00";
    if (jsonObj.BoneScaleSeed[1].startsWith("0x00"))
      jsonObj.BoneScaleSeed[1] = "0x00";

    encoded = btoa(JSON.stringify(jsonObj));
  }

  return encoded;
};
