

module.exports = function (isSideProject) {
    const typeClass = isSideProject ? 'side-item' : 'work-item';
    return 'col-6 col-12-large col-12-medium col-12-small col-12-xsmall item ' + typeClass;
};