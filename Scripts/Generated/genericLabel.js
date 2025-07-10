import ShopEvents from "./models/ShopEvents.js";
const GenericLabel = {
    initializeEventHandlers: function() {
        document.addEventListener(ShopEvents.DisplayGenericLabel, GenericLabel.DisplayGenericLabelHandler);
    },
    DisplayGenericLabelHandler: function(e) {
        var rawModel = e.detail.model;
        if (rawModel !== null && rawModel !== undefined) {
            var model = rawModel;
            GenericLabel.displayGenericLabel(model);
        }
    },
    displayGenericLabel: function(model) {
        var genericLabelContainer = document.querySelector(`div[data-genericlabel-container="true"][data-article="${model === null || model === void 0 ? void 0 : model.ArticleNumber}"]`);
        if (!(model === null || model === void 0 ? void 0 : model.DisplayLabel)) {
            if (genericLabelContainer !== null) {
                genericLabelContainer === null || genericLabelContainer === void 0 ? void 0 : genericLabelContainer.remove();
            }
            return;
        }
        if (genericLabelContainer !== null && model !== null && model.DisplayLabel) {
            if (genericLabelContainer !== undefined && model.LabelText !== '' && model.LabelText !== null) {
                if (model.OrderInterfaceContext === 2 ||
                    model.OrderInterfaceContext === 3 ||
                    model.OrderInterfaceContext === 1) {
                    genericLabelContainer.className = ` ${model.ClassName}`;
                } else {
                    genericLabelContainer.classList.add(model.ClassName);
                }
                var labelTextContainer = genericLabelContainer.querySelector('h5[data-labeltext="true"]');
                if (labelTextContainer !== undefined) {
                    labelTextContainer.innerHTML = model.LabelText;
                    GenericLabel.addClassToContainer(model === null || model === void 0 ? void 0 : model.ArticleNumber, 'generic-label', model.LabelTitleClassName);
                    if (model.OrderInterfaceContext === 2 ||
                        model.OrderInterfaceContext === 3) {
                        labelTextContainer.classList.add('generic-label-title-table');
                    }
                }
            }
        } else {
            genericLabelContainer === null || genericLabelContainer === void 0 ? void 0 : genericLabelContainer.remove();
        }
    },
    addClassToContainer: function(articleNumber, className, titleClassName) {
        if (articleNumber === undefined || articleNumber === null || articleNumber === '') {
            return;
        }
        var articleItem = document.querySelector(`div[data-articleid="${articleNumber}"]`);
        if (articleItem !== null && articleItem !== undefined) {
            articleItem.classList.add(className);
        }
        var saleItemContainer = document.querySelector(`div[data-related-article="${articleNumber}"]`);
        if (saleItemContainer !== null && saleItemContainer !== undefined) {
            saleItemContainer.classList.add(className);
        }
        var articleGroupTileContainer = document.querySelector(`div[data-articleselection-subcontainer="${articleNumber}"]`);
        if (articleGroupTileContainer !== null && articleGroupTileContainer !== undefined) {
            articleGroupTileContainer.classList.add(className);
        }
        var articleRow = document.querySelector(`tr[data-articlenumber="${articleNumber}"]`);
        if (articleRow !== null && articleRow !== undefined) {
            articleRow.classList.add(className);
            GenericLabel.addClassToLabelTitle(articleRow, titleClassName);
        }
        var favoritesRow = document.querySelector(`tr[data-favoriteslist-row="${articleNumber}"]`);
        if (favoritesRow !== null && favoritesRow !== undefined) {
            favoritesRow.classList.add(className);
        }
        var articleImage = document.querySelector('div[data-productimage-container="true"]');
        if (articleImage !== null && articleImage !== undefined) {
            articleImage.classList.add(className);
        }
    },
    addClassToLabelTitle: function(parent, className) {
        var labelTitle = parent.querySelector('h5');
        if (labelTitle !== undefined) {
            labelTitle.className = className;
        }
    }
};
export default GenericLabel;