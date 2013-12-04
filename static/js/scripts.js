jQuery(function()
{
  var toTop = jQuery("#to-top");
  toTop.click(function ()
  {
    jQuery("body,html").animate({
        scrollTop: 0
    }, 800);
    return false;
  });
});

jQuery(window).scroll(function()
{
  var scrollTop = jQuery(window).scrollTop();

  // Fix header
  var header = jQuery("#header");
  var height = header.height();
  var fixed = (scrollTop > height);
  if (fixed != header.hasClass("fixed"))
  {
    if (fixed)
    {
      header.css("top", -height);
      header.animate({top: 0},function()
      {
          header.css("top", "");
      });
      header.addClass("fixed");
    }
    else
      header.removeClass("fixed");
  }

  // Display "to top" button
  var toTop = jQuery("#to-top");
  toTop.css("opacity", scrollTop > 100 ? 1 : 0)
});
