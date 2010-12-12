$(function () {
    JstructureDemo.post.smileHighlighter.init();
});

JstructureDemo = {};
JstructureDemo.post = {};
JstructureDemo.post.smileHighlighter = {
    init: function () {
        var smileRegexp = /:\)/;
        $('.post').each(function () {
           if (this.innerHTML.match(smileRegexp)) {
             $(this).addClass('smile');
           }
        });
    }
};

