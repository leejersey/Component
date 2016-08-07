//jquey面向过程写法
$(function() {
    var $box = $('#box'),
        $doc = $(document);

    $box.on('mousedown', function(ev) {
        var disX = ev.clientX - $(this).offset().left;
        var disY = ev.clientY - $(this).offset().top;

        $doc.on('mousemove', function(ev) {
            $box.css({
                left: ev.clientX - disX + 'px',
                top: ev.clientY - disY + 'px'
            });
        });

        $doc.on('mouseup', function() {
            $doc.off('mousemove');
            $doc.off('mouseup');
        });

        return false;
    });

});
