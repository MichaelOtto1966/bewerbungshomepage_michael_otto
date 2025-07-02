---
title: Die script.js zur Info
description: Die script.js zur Info, damit nicht alles abgeschrieben werden muss
img: irgendeinbild.jpg
date: 30.03.2022
---

# Die server.js

Diese Datei ist meine **script.js**. Ggf. sind Anpassungen an Eure Umgebung notwendig.  

```
/* -- ----------------------------- */
/* -- BKSD - Remove Active          */
/* -- ----------------------------- */
function active_remove() {
  $(".active").each(function (index) {
    $(this).removeClass("active");
  });
}
/* -- ------------------------------ */
/* -- BKSD - Set Active Menü         */
/* -- ------------------------------ */
function setActiveMenu(id) {
    /* Entferne Active-Markierung */  
    active_remove();
    /* Füge Klasse Active hinzu */
    jQuery(id).addClass("active");
}

/* ------------------------------------------ */
/* -- jQuery Slider-Effekt                    */
/* -- ---------------- ---------------------- */
window.addEventListener("load", function () {
  $(".slider1").mouseenter(function () {
    $(".upndown1 .image-slider").slideDown("slow");
  });
  $(".upndown1").mouseleave(function () {
    setTimeout("$('.upndown1 .image-slider').slideUp('slow')", 2000);
  });
  $(".slider2").mouseenter(function () {
    $(".upndown2 .image-slider").slideDown("slow");
  });
  $(".upndown2").mouseleave(function () {
    setTimeout("$('.upndown2 .image-slider').slideUp('slow')", 2000);
  });
});

/* ------------------------------------------ */
/* -- Inhalte laden                           */
/* -- ---------------- ---------------------- */
   function load_content(bereich, page) {
       obj1 = document.getElementById(bereich);   
       $(obj1).load('/' + page, function () {
      });
    }

/* ------------------------------------------ */
/* -- Funktion für das Versenden der Mail     */
/* -- ---------------- ---------------------- */
const sendMail = (mail) => {
  //1.Wenn das Formular versendet wird, werden alle Formularinformationen hiermit übertragen
  fetch("/send", {
    method: "post", //2.
    body: mail, //3.

  }).then((response) => {
    return response.json();
  });
};

/* ------------------------------------------ */
/* -- Eingabeprüfung für das Kontaktformular  */
/* -- ---------------- ---------------------- */
function validateForm() {
  
// Definiere die Variable zur Benennung der Form
const contactForm = document.getElementById("myForm");

var alert_flag = "true";
 if(contactForm.fullname.value == "")  {
   alert("Geben Sie bitte Ihren Namen an!");
   contactForm.fullname.focus();
   var alert_flag = "false";
   return false;
  }
  if(contactForm.email.value == "") {
   alert("Geben Sie bitte Ihre E-Mail-Adresse an!");
   contactForm.email.focus();
   var alert_flag = "false";
   return false;
  }
   if(contactForm.email.value.indexOf('@') == -1) {
   alert("Dies ist keine gültige E-Mail-Adresse!");
   contactForm.email.focus();
   var alert_flag = "false";
   return false;
  }
 if(contactForm.reason.value == "")  {
   alert("Geben Sie bitte Ihr Anliegen an!");
   contactForm.reason.focus();
   var alert_flag = "false";
   return false;
  }
 if(contactForm.formmessage.value == "")  {
   alert("Geben Sie bitte einen Nachrichtentext an!");
   contactForm.formmessage.focus();
   var alert_flag = "false";
   return false;
  }
 if(contactForm.ds_check.checked == false)  {
   alert("Wenn Sie die Speicherung Ihrer Daten nicht wünschen, nehmen Sie bitte mit uns telefonisch Kontakt auf. Die Kontaktinformationen finden Sie ebenfalls auf unserer Website.");
   contactForm.ds_check.focus();
   var alert_flag = "false";
   return false;
  }
 if(alert_flag == "true") {
    
    /* Zeigt die Meldung des E-Mail-Versands an und versteckt gleichzeitig den Sendebutton */
    obj_erg_form = document.getElementById('ergebnis_send');
    obj_submit = document.getElementById('Submit');
    obj_erg_form.style.display = 'block';
    obj_submit.style.display = 'none';
 
    //Dies stellt sicher, dass die Mail nur einmal gesendet wird
    event.preventDefault();
    
    //Hole die Daten 
    let mail = new FormData(contactForm);

    //Rufe die Funktion "sendMail" auf für die Versendung der Mail auf. Dies geschieht nur, wenn alle Formularfelder angegeben wurden."
    sendMail(mail);
   
   //Leere das Formular nach der Versendung der E-Mail
   contactForm.fullname.value = "";
   contactForm.email.value = "";
   contactForm.reason.value = "";
   contactForm.formmessage.value = "";
 
 }
  
}

```