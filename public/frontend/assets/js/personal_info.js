$(document).ready(function() {
    $('input[type=radio][name=bike_cond]').change(function() {
        $.post(config.host + "withdraw", 
        {
            withdraw: this.value == "cond_new"
        }).done(function() {
            window.location.reload()
        })
    });
    
    $("#save_bank_account").click(function() {
        $.post(config.host + "withdraw", 
        {
            bank_id: $("#text_bank_id").val(),
            account: $("#text_bank_account").val()
        }).done(function() {
            window.location.reload()
        })
    })
})

