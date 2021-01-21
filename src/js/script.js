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

  //! Validate

  // $('#order form').validate();
  // $('#consultation-form').validate();
  // $('#consultation form').validate({
  //   rules: {
  //     name: {
  //       required: true,
  //       minlength: 2
  //     },
  //     phone: "required",
  //     email: {
  //       required: true,
  //       email: true
  //     }
  //   },
  //   messages: {
  //     name: {
  //       required: "Пожалуйста, введите свое имя",
  //       minlength: jQuery.validator.format("Введите {0} символа!")
  //     },
  //     phone: "Пожалуйста, введите свой номер телефона ",
  //     email: {
  //       required: "Пожалкйста, введите свою почту",
  //       email: "Неправильно введен адрес почты"
  //     }
  //   }
  // });

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символа!")
        },
        phone: "Пожалуйста, введите свой номер телефона ",
        email: {
          required: "Пожалкйста, введите свою почту",
          email: "Неправильно введен адрес почты"
        }
      }
    });
  }

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  $('input[name=phone]').mask("+7 (999) 999-9999");

  $('form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function () {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('fast');

      $('form').trigger('reset');
    });
    return false;
  });
});