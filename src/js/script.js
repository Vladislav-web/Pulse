$(document).ready(function () {
  //! SLIDER
  $('.carousel__inner').slick({
    speed: 1200,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
    responsive: [{
      breakpoint: 992,
      settings: {
        dots: false,
        arrows: false
      }
    }]
  });

  //! CATALOG

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab--active)', function () {
    $(this)
      .addClass('catalog__tab--active').siblings().removeClass('catalog__tab--active')
      .closest('div.main__container').find('div.catalog__content').removeClass('catalog__content--active').eq($(this).index()).addClass('catalog__content--active');
  });

  //@ Oптимизированный код
  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog__content-2').eq(i).toggleClass('catalog__content-2--active');
        $('.catalog__list').eq(i).toggleClass('catalog__list--active');
      })
    })
  };

  toggleSlide('.catalog__link');
  toggleSlide('.catalog__back');

  //! Modal

  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

  $('.button--mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog__subtitle').eq(i).text())
      $('.overlay, #order').fadeIn('slow');
    })
  });
});