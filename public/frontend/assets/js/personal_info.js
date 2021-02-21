$(document).ready(function() {
    if(window.localStorage.user == undefined) return;
    var self = JSON.parse(window.localStorage.user)
    
    function reload() {
        Login.login().then(function() {
            window.location.reload()    
        })
    }
    
    $("#bank_balance").text(`您的帳戶餘額：${self.balance}$`) 
    
    var checked = self.withdraw == "1" ? "cond_new" : "cond_used"
    $(`#${checked}`).prop('checked', true);
    
    $('input[type=radio][name=bike_cond]').change(function() {
        $.post(config.host + "withdraw", 
        {
            withdraw: this.value == "cond_new"
        }).done(reload)
    });
    
    $("#text_bank_id").val(self.bank_id)
    $("#text_bank_account").val(self.bank_account)
    
    $("#save_bank_account").click(function() {
        $.post(config.host + "withdraw", 
        {
            bank_id: $("#text_bank_id").val(),
            account: $("#text_bank_account").val()
        }).done(reload)
    })
})

