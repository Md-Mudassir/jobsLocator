$(document).ready(() => {
  //Preloader
  $(window).on("load", () => {
    preloaderFadeOutTime = 500;
    hidePreloader = () => {
      let preloader = $(".spinner-wrapper");
      preloader.fadeOut(preloaderFadeOutTime);
    };
    hidePreloader();
  });
});
