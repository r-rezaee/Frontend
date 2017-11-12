$(document).ready(function() {


    $('#valjdittlandskap').click(function() {
        $.get('lan' + this.value + '.xml',
            function($xml) {
                $xml = $($xml);
                $('#valjdinkommun').empty();

                $('#postnummer').val(function() {
                    return this.defaultValue;
                });

                $xml.find('kommun').each(function() {
                    $('#valjdinkommun').append("<option value='" + $(this).attr('kommunid') + "'>" + $(this).text() + "</option>");

                });

            });
    });

});