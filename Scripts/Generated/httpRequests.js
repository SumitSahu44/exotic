const HttpRequests = {
    ExecuteGet: function(url, returnType, argumentValues, callBackArguments, successCallback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                switch (returnType) {
                    case 1:
                        successCallback(xmlhttp.responseText, callBackArguments);
                        break;
                    case 0:
                    default:
                        let result;
                        if (xmlhttp.response !== null && xmlhttp.response !== '') {
                            result = JSON.parse(xmlhttp.response);
                        }
                        successCallback(result, callBackArguments);
                        break;
                }
            }
        };
        var queryString = '';
        if (argumentValues !== null) {
            queryString = HttpRequests.EncodeQueryData(argumentValues);
            if (queryString !== '') {
                queryString = `?${queryString}`;
            }
        }
        xmlhttp.open('GET', `${url}${queryString}`, true);
        if (argumentValues !== null && argumentValues !== undefined) {
            var data = JSON.stringify(argumentValues);
            xmlhttp.send(data);
        } else {
            xmlhttp.send();
        }
    },
    ExecutePost: function(url, postArguments, successCallBack, callBackArguments) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                let result = JSON.parse(xmlhttp.response);
                successCallBack(result, callBackArguments);
            }
        };
        if (postArguments) {
            xmlhttp.open('POST', url, true);
            xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            xmlhttp.send(JSON.stringify(postArguments));
        } else {
            xmlhttp.send();
        }
    },
    EncodeQueryData: function(data) {
        const result = [];
        for (let d in data) {
            {
                result.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
            }
        }
        return result.join('&');
    }
};
export default HttpRequests;