import HttpRequests from './httpRequests.js';
import ShopEvents from './models/ShopEvents.js';
const BasketPreviewAside = {
    basketIsOpen: false,
    init: function() {
        BasketPreviewAside.initializeCustomEventHandlers();
        BasketPreviewAside.ToggleEmptyMessage();
        var openButton = document.querySelector('a[data-basket-preview-aside="button"]');
        openButton === null || openButton === void 0 ? void 0 : openButton.addEventListener('click', BasketPreviewAside.openBasket);
        var background = document.querySelector('div[data-basket-preview-aside="background"]');
        background.addEventListener('click', BasketPreviewAside.closeBasket);
    },
    initializeEvents: function() {
        var toggleButton = document.querySelector('a[data-previewaside-togglebasket="true"]');
        toggleButton === null || toggleButton === void 0 ? void 0 : toggleButton.addEventListener('click', BasketPreviewAside.toggleBasket);
        var deleteButtons = document.querySelectorAll('a[data-previewaside-remove="true"]');
        deleteButtons.forEach((deleteButton) => {
            deleteButton.addEventListener('click', BasketPreviewAside.RemoveArticle);
        });
    },
    initializeCustomEventHandlers: function() {
        document.addEventListener(ShopEvents.LoadBasketPreviewEvent, BasketPreviewAside.openBasket);
    },
    toggleBasket: function(e) {
        e.preventDefault();
        if (BasketPreviewAside.basketIsOpen) {
            BasketPreviewAside.closeBasket();
        } else {
            BasketPreviewAside.openBasket(null);
        }
    },
    closeBasket: function() {
        BasketPreviewAside.basketIsOpen = false;
        var bodyElement = document.querySelector('body');
        bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.classList.remove('open-aside-cart');
    },
    openBasket: function(e) {
        let articleNumber = e.detail.articleNumber;
        BasketPreviewAside.basketIsOpen = true;
        var argumentValues = {
            'articleNumber': articleNumber
        };
        HttpRequests.ExecuteGet('/Basket/ContentPreviewAside', 1, argumentValues, null, BasketPreviewAside.ContentPreviewAsidePostBack);
    },
    ContentPreviewAsidePostBack: function(result) {
        var container = document.querySelector('div[data-basket-preview-aside="container"]');
        if (container != null) {
            container.innerHTML = result;
            BasketPreviewAside.initializeEvents();
        }
        window.setTimeout(function() {
            var bodyElement = document.querySelector('body');
            bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.classList.add('open-aside-cart');
            window.setTimeout(function() {
                BasketPreviewAside.HighlightChangedItem();
            }, 250);
        }, 100);
    },
    HighlightChangedItem: function() {
        var itemToHighLight = document.querySelector('div[data-previewaside-highlight="True"]');
        if (itemToHighLight !== null) {
            itemToHighLight.classList.add('highlight');
            setTimeout(() => {
                itemToHighLight.classList.remove('highlight');
            }, 2000);
        }
    },
    RemoveArticle: function(e) {
        var _a;
        e.preventDefault();
        let deleteButton = e.currentTarget;
        if (deleteButton !== null) {
            let identifier = (_a = deleteButton.attributes['data-basketitemid']) === null || _a === void 0 ? void 0 : _a.value;
            if (identifier !== undefined && identifier !== '') {
                let articleElement = document.querySelector(`article[data-previewaside-article="${identifier}"]`);
                articleElement.style.transition = 'opacity 250ms, height 250ms';
                articleElement.style.opacity = '0';
                articleElement.style.height = '0';
                setTimeout(() => {
                    articleElement.remove();
                    BasketPreviewAside.ToggleEmptyMessage();
                    BasketPreviewAside.RemoveArticleFromBasket(identifier);
                }, 250);
            }
        }
    },
    RemoveArticleFromBasket: function(identifier) {
        globalThis.basketinterface.removeClick(undefined, identifier, globalThis.basketinterface.getSummary);
    },
    ToggleEmptyMessage: function() {
        var articlesInPreview = document.querySelectorAll(`article[data-previewaside-article]`);
        if ((articlesInPreview === null || articlesInPreview === void 0 ? void 0 : articlesInPreview.length) === 0) {
            let emptyMessage = document.querySelector('p[data-previewaside-emptymessage="true"]');
            emptyMessage === null || emptyMessage === void 0 ? void 0 : emptyMessage.classList.remove('hide');
        }
    }
};
addEventListener("DOMContentLoaded", (event) => {
    BasketPreviewAside.init();
});