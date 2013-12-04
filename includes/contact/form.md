For any general inquiry, please fill out the form below to get in touch. For press requests or job applications, please refer to the respective given email address. We will try our best to respond to every request in a timely manner.

<form id="contact-form" action="/contact" method="post" markdown>
  Your Name (required)<br>
  <input type="text" name="name" value="" size="40" required aria-required="true">

  Your Email (required)<br>
  <input type="email" name="email" value="" size="40" required aria-required="true">

  Subject<br>
  <input type="text" name="subject" value="" size="40">

  Your Message<br>
  <textarea name="message" cols="40" rows="10" required aria-required="true"></textarea>

  <button type="submit">Send</button>
  ![in progress](/images/ajax-loader.gif){#load-indicator style="display: none;"}

  <p id="server-response"></p>
</form>

<script src="/js/jquery.form.min.js"></script>
<script src="/js/jquery.validate.min.js"></script>

<script>
  jQuery(function()
  {
    jQuery("#contact-form").validate();
    jQuery("#contact-form").ajaxForm({
      target: "#server-response",
      beforeSubmit: function()
      {
        jQuery("#load-indicator").show();
      },

      complete: function()
      {
        jQuery("#load-indicator").hide();
      },

      success: function()
      {
        jQuery("#server-response").removeClass("error");
      },

      error: function(xhr, status, error)
      {
        jQuery("#server-response").addClass("error").text(error);
      }
    });
  });
</script>
