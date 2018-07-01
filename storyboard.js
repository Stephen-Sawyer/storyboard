$.fn.extend({
    story:function(settings) {
        //settings checking
        if(settings===undefined) throw "Storyboard.js: no settings object passed (expects object)";
        if(!Array.isArray(settings.chapters)) throw "Storyboard.js: settings.chapters: incorrect type (expects array)";
        if(settings.folder === undefined) throw "Storyboard.js: settings.folder is undefined";
        //setup
        $(this).addClass("storyboard");
        //get pages
        var page = settings.chapters[0];
            $.ajax({url:settings.folder !== "" ? settings.folder + "/" + page : page}).done((data) => {
                let nextPage = undefined;
                
                if(settings.chapters[1]){
                    nextPage = settings.folder !== "" ? settings.folder + "/" + settings.chapters[1] : settings.chapters[1];
                }
                
                $(this).append(`<div ${nextPage!==undefined?'next-chapter="' + nextPage + '"':""} class="storyboard-chapter">${data}</div>`);
         });

        //next page
        (window.$storyboard === undefined && (window.$storyboard = {}));
        window.$storyboard[$(this).attr("id")+"Next"] = (callback) => {
            (callback!==undefined&&callback($(this)));
            let nextPage = $(this).find("[next-chapter]").attr("next-chapter");
            $.ajax({url: nextPage}).done((data) => {
                let np = settings.chapters.indexOf(nextPage.split("/")[1]);
                
                if(settings.chapters.length-1 > np){
                    np = settings.folder !== "" ? settings.folder + "/" + settings.chapters[np+1] : settings.chapters[np+1];
                }


                $(this).html("").append(`<div ${typeof(np)!=="number"?'next-chapter="'+np+'"':""} class="storyboard-chapter">${data}</div>`);
            });
        };
        //end story
        window.$storyboard[$(this).attr("id")+"End"] = (callback) => {
            callback($(this));
        };
        
    }
});