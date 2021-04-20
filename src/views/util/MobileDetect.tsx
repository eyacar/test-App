export default function MobileDetect(): boolean {
  let isMobile = false;
  var divices = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        divices.Android() ||
        divices.BlackBerry() ||
        divices.iOS() ||
        divices.Opera() ||
        divices.Windows()
      );
    },
  };

  if (divices.any()) {
    isMobile = true;
  }
  return isMobile;
}
