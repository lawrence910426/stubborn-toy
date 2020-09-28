$(document).ready(function() {
    $("#bank_balance").text(`您的帳戶餘額：${window.localStorage.user.balance}$`) 
    
    var checked = window.localStorage.user.withdraw == "1" ? "cond_new" : "cond_used"
    $(`#${checked}`).prop('checked',true);
    
    $('input[type=radio][name=bike_cond]').change(function() {
        $.post(config.host + "withdraw", 
        {
            withdraw: this.value == "cond_new"
        }).done(function() {
            window.location.reload()
        })
    });
    
    $("#text_bank_id").val(window.localStorage.user.bank_id)
    $("#text_bank_account").val(window.localStorage.user.bank_account)
    
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

