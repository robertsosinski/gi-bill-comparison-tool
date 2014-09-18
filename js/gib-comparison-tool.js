/*
 * gib-comparison-tool.js - The GI Bill Comparison Tool Module
 */


// Define `console` in IE9 and below
(function () {
  var f = function () {};
  if (!window.console) {
    window.console = { log:f, info:f, warn:f, debug:f, error:f };
  }
})();

var GIBComparisonTool = (function () {

var InstitutionData = (function(data, index) {
  this.data = data;

  // User form data
  this.formData = {
    online:                false,
    in_state:              true,
    tuition_fees:          '',
    in_state_tuition_fees: '',
    yellow_ribbon:         false,
    yellow_ben:            '',
    rop:                   '',
    ojt_working:           '',
    calendar:              '',
    number_nontrad_terms:  '',
    length_nontrad_terms:  '',
    kicker_elig:           false,
    kicker:                0,
    scholar:               '',
    tuition_assist:        ''
  };

  // Calculated values
  this.calculated = {
    tier:                     0.0,
    service_discharge:        false,
    institution_type:         '',
    institution_type_display: '',
    location:                 '',
    est_tuition_fees:         0,
    est_housing_allowance:    0,
    est_book_stipend:         0,
    tuition_out_of_state:     0,
    number_of_terms:          0,
    term_length:              0,
    acad_year_length:         0,
    tuition_net_price:        0,
    tuition_fees_cap:         0,
    tuition_fees_per_term:    0,
    rop_book:                 0,
    rop_ojt:                  0,
    kicker_benefit:            0,
    term1:                    '',
    term2:                    '',
    term3:                    '',
    term4:                    '',
    tuition_fees_term_1:      0,
    tuition_fees_term_2:      0,
    tuition_fees_term_3:      0,
    tuition_fees_total:       0,
    yr_ben_term_1:            0,
    yr_ben_term_2:            0,
    yr_ben_term_3:            0,
    yr_ben_total:             0,
    yr_ben_school_term_1:     0,
    yr_ben_school_term_2:     0,
    yr_ben_school_term_3:     0,
    yr_ben_school_total:      0,
    yr_ben_va_term_1:         0,
    yr_ben_va_term_2:         0,
    yr_ben_va_term_3:         0,
    yr_ben_va_total:          0,
    housing_allow_term_1:     0,
    housing_allow_term_2:     0,
    housing_allow_term_3:     0,
    housing_allow_total:      0,
    book_stipend_term_1:      0,
    book_stipend_term_2:      0,
    book_stipend_term_3:      0,
    book_stipend_total:       0,
    total_term_1:             0,
    total_term_2:             0,
    total_term_3:             0,
    total_to_school:          0,
    total_scholarship_ta:     0,
    total_to_you:             0,
    total_left_to_pay:        0,
    total_year:               0,
    yellow_ribbon_elig:       false
  };

  var getElement = function(id, opt_parentId) {
    if (opt_parentId) {
      return $(opt_parentId + '-' + (index + 1) + ' ' + id);
    } else {
      return $(id + '-' + (index + 1));
    }
  };

  var getValue = function(id) {
    return getElement(id).val();
  };

  var getNumber = function(id) {
    return Number(getValue(id));
  };

  var getChecked = function(id) {
    return getElement(id).prop('checked');
  };

  /*
   * ADD A COMMENT
   */
  var getCurrency = function (id) {
    var currency = getValue(id);
    return Number(currency.replace(/[^0-9\.]+/g,''));
  }

  var institution = this.data;
  var calculated = this.calculated;
  var formData = this.formData;

  /*
   * Get user data from the form
   */
  var getFormData = function () {
//    formData.in_state              = getChecked('#in-state-yes', '#calculator');
//    formData.tuition_fees          = getCurrency('#tuition-fees-input', '#calculator');
//    formData.in_state_tuition_fees = getCurrency('#in-state-tuition-fees', '#calculator');
//    formData.yellow_ribbon         = getChecked('#yellow-ribbon-recipient-yes', '#calculator');
//    formData.yellow_ben            = getCurrency('#yellow-ribbon-amount', '#calculator');
//    formData.rop                   = getValue('#enrolled', '#calculator');
//    formData.ojt_working           = getValue('#working', '#calculator');
//    formData.calendar              = getValue('#calendar', '#calculator');
//    formData.number_nontrad_terms  = getNumber('#number-non-traditional-terms', '#calculator');
//    formData.length_nontrad_terms  = getValue('#length-non-traditional-terms', '#calculator');
//    formData.kicker_elig           = getChecked('#kicker-elig-yes', '#calculator');
//    formData.kicker                = getCurrency('#kicker', '#calculator');
//    formData.scholar               = getCurrency('#scholar', '#calculator');
//    formData.tuition_assist        = getCurrency('#tuition-assist', '#calculator');
  };


  this.resetHtml = function() {
//    getElement('#yellow-ribbon-recipient-no', '#calculator').prop('checked', true);
//    getElement('#yellow-ribbon-amount', '#calculator').val('$0');
//    getElement('#scholar', '#calculator').val('$0');
//    getElement('#tuition-assist', '#calculator').val('$0');
//    getElement('#kicker-elig-no', '#calculator').prop('checked', true);
//    getElement('#kicker', '#calculator').val('$200');
//    getFormData();

    // Hide calculator but prepare it to show again.
    getElement('#calculator').hide();
//    getElement('#calculate-benefits-btn a', '#calculator').html("How much am I going to get?");
//    getElement('#calculate-benefits-btn', '#calculator').show();

    // Update the tuition fees input.
//    getElement('#tuition-fees-input', '#calculator').val(formatCurrency(institution.tuition_in_state));
//    getElement('#in-state-tuition-fees', '#calculator').val(formatCurrency(institution.tuition_in_state));
    formData.tuition_fees = institution.tuition_in_state;

    // Set term calendar from the institution data if present
//    if (institution.calendar) {
//      formData.calendar = institution.calendar;
//      getElement('#calendar', '#calculator').val(institution.calendar);
//    } else {
//      formData.calendar = 'semesters';
//      getElement('#calendar', '#calculator').val('semesters');
//    }
  };

  /*
   * Formats numbers
   */
  var formatNumber = function (num) {
    var str = num.toString();
    if (str.length > 3) {
       return str.slice(0, -3) + ',' + str.slice(-3);
    } else {
      return str;
    }
  };

  this.updateHtml = function(globalFormData) {
    console.log('Updating HTML for institution ' + index + ': ' +
        institution.institution);
    getElement('#institution', '#benefit-estimator').html(institution.institution);
    getElement('#location', '#benefit-estimator').html(calculated.location);
    getElement('#type', '#benefit-estimator').html(calculated.institution_type_display);
    getElement('#tuition-fees', '#benefit-estimator').html(calculated.est_tuition_fees);
    getElement('#housing-allowance', '#benefit-estimator').html(calculated.est_housing_allowance);
    getElement('#book-stipend', '#benefit-estimator').html(calculated.est_book_stipend);
    getElement('#poe', '#benefit-estimator').html(institution.poe ? 'Yes' : 'No');


    if (institution.yr) {
      var location = institution.country == 'USA' ? institution.state : 'overseas';
      var linkFirstHalf = '<a href="http://www.benefits.va.gov/gibill/yellow_ribbon/2014/states/' + location + '.asp" onclick="track(\'Yellow Ribbon Rates\', \'';
      var linkSecondHalf = '\');" target="_blank">See YR rates &raquo;</a>';

      var linkVetIndicators = linkFirstHalf + 'Vet Indicators' + linkSecondHalf;
      var linkCalculator = linkFirstHalf + 'Calculator' + linkSecondHalf;

      getElement('#yr', '#veteran-indicators').html('Yes &nbsp; ' + linkVetIndicators);
//      getElement('#yellow-ribbon-rates-link', '#calculator').html(linkCalculator);
    } else {
      getElement('#yr', '#veteran-indicators').html('No');
    }

    getElement('#gibill', '#veteran-indicators').html(institution.gibill ? formatNumber(institution.gibill) : 0);

//    getElement('#institution-calculator', '#calculator').html(institution.institution);
//    getElement('#location-calculator', '#calculator').html(calculated.location);
//    getElement('#type-calculator', '#calculator').html(calculated.institution_type_display);

    // These do not exist.
//    getElement('#tuition-out-of-state', '#calculator').html(calculated.tuition_out_of_state)

//    getElement('#numberofterms', '#calculator').html(calculated.number_of_terms);
//    getElement('#termlength', '#calculator').html(calculated.term_length);
//    getElement('#acadyearlength', '#calculator').html(calculated.acad_year_length);
//    getElement('#yr_console', '#calculator').html(institution.yr);

//    getElement('#term1', '#calculator').html(calculated.term1);
//    getElement('#term2', '#calculator').html(calculated.term2);
//    getElement('#term3', '#calculator').html(calculated.term3);
//    getElement('#term4', '#calculator').html(calculated.term4);

    /*
    getElement('#tuition-fees-term-1', '#calculator').html(formatCurrency(calculated.tuition_fees_term_1));
    getElement('#tuition-fees-term-2', '#calculator').html(formatCurrency(calculated.tuition_fees_term_2));
    getElement('#tuition-fees-term-3', '#calculator').html(formatCurrency(calculated.tuition_fees_term_3));
    getElement('#tuition-fees-total', '#calculator').html(formatCurrency(calculated.tuition_fees_total));

    getElement('#yr-ben-term-1', '#calculator').html(formatCurrency(calculated.yr_ben_school_term_1));
    getElement('#yr-ben-term-2', '#calculator').html(formatCurrency(calculated.yr_ben_school_term_2));
    getElement('#yr-ben-term-3', '#calculator').html(formatCurrency(calculated.yr_ben_school_term_3));
    getElement('#yr-ben-total', '#calculator').html(formatCurrency(calculated.yr_ben_school_total));

    getElement('#yr-ben-term-va-1', '#calculator').html(formatCurrency(calculated.yr_ben_va_term_1));
    getElement('#yr-ben-term-va-2', '#calculator').html(formatCurrency(calculated.yr_ben_va_term_2));
    getElement('#yr-ben-term-va-3', '#calculator').html(formatCurrency(calculated.yr_ben_va_term_3));
    getElement('#yr-ben-va-total', '#calculator').html(formatCurrency(calculated.yr_ben_va_total));

    getElement('#total-paid-to-school', '#calculator').html(formatCurrency(calculated.total_to_school));
    getElement('#total-tuition-fees-scholarships', '#calculator').html(formatCurrency(calculated.total_scholarship_ta));
    getElement('#total-tuition-fees-charged', '#calculator').html(formatCurrency(formData.tuition_fees));

    getElement('#total-left-to-pay', '#calculator').html(formatCurrency(calculated.total_left_to_pay));
    if (calculated.total_left_to_pay > 0) {
      getElement('#total-left-to-pay', '#calculator').addClass('red');
    } else {
      getElement('#total-left-to-pay', '#calculator').removeClass('red');
    }

    getElement('#housing-allow-term-1', '#calculator').html(formatCurrency(calculated.housing_allow_term_1) + ' /month');
    getElement('#housing-allow-term-2', '#calculator').html(formatCurrency(calculated.housing_allow_term_2) + ' /month');
    getElement('#housing-allow-term-3', '#calculator').html(formatCurrency(calculated.housing_allow_term_3) + ' /month');
    getElement('#housing-allow-total', '#calculator').html(formatCurrency(calculated.housing_allow_total));

    getElement('#book-stipend-term-1', '#calculator').html(formatCurrency(calculated.book_stipend_term_1));
    getElement('#book-stipend-term-2', '#calculator').html(formatCurrency(calculated.book_stipend_term_2));
    getElement('#book-stipend-term-3', '#calculator').html(formatCurrency(calculated.book_stipend_term_3));
    getElement('#book-stipend-total', '#calculator').html(formatCurrency(calculated.book_stipend_total));

    if (calculated.institution_type == 'ojt') {
      getElement('#housing-allow-total', '#calculator').append(' /month');
      getElement('#book-stipend-term-1', '#calculator').append(' /month');
      getElement('#book-stipend-term-2', '#calculator').append(' /month');
      getElement('#book-stipend-term-3', '#calculator').append(' /month');
      getElement('#book-stipend-total', '#calculator').append(' /month');
    }

    getElement('#total-term-1', '#calculator').html(formatCurrency(calculated.total_term_1));
    getElement('#total-term-2', '#calculator').html(formatCurrency(calculated.total_term_2));
    getElement('#total-term-3', '#calculator').html(formatCurrency(calculated.total_term_3));

    getElement('#total-paid-to-you', '#calculator').html(formatCurrency(calculated.total_to_you));
    getElement('#total-year', '#calculator').html(formatCurrency(calculated.total_year));
    */

    if (institution.student_veteran) {
      getElement('#student-veterans', '#veteran-indicators').html('Yes');
      if (institution.student_veteran_link) {
        getElement('#student-veterans', '#veteran-indicators').append(' &nbsp; <a href="'+ institution.student_veteran_link +'" onclick="track(\'Student Veterans Group\', \'Click\');" target="_blank">Go to site &raquo;</a>');
      }
    } else {
      getElement('#student-veterans', '#veteran-indicators').html('No');
    }

    getElement('#vet-success', '#veteran-indicators').html('Yes &nbsp; <a href="mailto:'+ institution.vetsuccess_email +'" onclick="track(\'Vet Success\', \'Email\');">Email '+ institution.vetsuccess_name +' &raquo;</a>');

    // Show/hide elements (defaults) ///////////////////////////////////////////

    getElement('#online-classes').show();
    getElement('#voc-rehab', '#benefit-estimator').hide();
    getElement('#veteran-indicators').show();
    getElement('#vet-success-row', '#veteran-indicators').hide();
    getElement('#eight-keys-row', '#veteran-indicators').hide();
    getElement('#school-indicators').show();

    /*
    // Tuition/Fees Input Results
    getElement('#tuition-fees-section', '#calculator').show();
    getElement('#in-state', '#calculator').hide();
    getElement('#in-state-tuition-fees-form', '#calculator').hide();
    getElement('#yellow-ribbon-recipient-form', '#calculator').hide();
    getElement('#yellow-ribbon-amount-form', '#calculator').hide();
    getElement('#yellow-ribbon-rates-link', '#calculator').hide();
    getElement('#scholar-form', '#calculator').show();
    getElement('#tuition-assist-form', '#calculator').hide();

    // Enrollment Inputs
    getElement('#enrollment-section', '#calculator').show();
    getElement('#enrolled-form', '#calculator').show();
    getElement('#working-form', '#calculator').hide();
    getElement('#calendar-form', '#calculator').show();
    getElement('#number-non-traditional-terms-form', '#calculator').hide();
    getElement('#length-non-traditional-terms-form', '#calculator').hide();
    getElement('#kicker-elig-form', '#calculator').show();
    getElement('#kicker-form', '#calculator').hide();

    // Calculator Results
    getElement('#paid-school-calculator', '#calculator').show();
    getElement('#calc-tuition-fees-row', '#calculator').show();
    getElement('#calc-yellow-ribbon-row', '#calculator').show();
    getElement('#calc-yellow-ribbon-va-row', '#calculator').show();
    getElement('#calc-paid-to-school-total-row', '#calculator').show();
    getElement('#calc-tuition-fees-scholarship-row', '#calculator').show();
    getElement('#calc-tuition-fees-charged-row', '#calculator').show();
    getElement('#calc-out-of-pocket-row', '#calculator').show();
    getElement('#calc-paid-to-you-total-row', '#calculator').show();
    getElement('#paid-to-you-calculator', '#calculator').show();
    getElement('#calc-term-total-row', '#calculator').show();

    // Calculator Results - Particular Terms
    getElement('#term2', '#calculator').show();
    getElement('#term3', '#calculator').show();
    getElement('#tuition-fees-term-2', '#calculator').show();
    getElement('#tuition-fees-term-3', '#calculator').show();
    getElement('#yr-ben-term-2', '#calculator').show();
    getElement('#yr-ben-term-3', '#calculator').show();
    getElement('#yr-ben-term-va-2', '#calculator').show();
    getElement('#yr-ben-term-va-3', '#calculator').show();
    getElement('#housing-allow-term-2', '#calculator').show();
    getElement('#housing-allow-term-3', '#calculator').show();
    getElement('#book-stipend-term-2', '#calculator').show();
    getElement('#book-stipend-term-3', '#calculator').show();
    getElement('#total-term-2', '#calculator').show();
    getElement('#total-term-3', '#calculator').show();
    */

    // Show/Hide elements (overrides) //////////////////////////////////////////

    if (globalFormData.cumulative_service == 'service discharge') {
      getElement('#voc-rehab', '#benefit-estimator').show();
    }

    if (calculated.institution_type == 'ojt') {
      getElement('#online-classes').hide();
      getElement('#veteran-indicators').hide();
      getElement('#school-indicators').hide();
//      getElement('#tuition-fees-section', '#calculator').hide();
//      getElement('#enrolled-form', '#calculator').hide();
//      getElement('#working-form', '#calculator').show();
//      getElement('#calendar-form', '#calculator').hide();
//      getElement('#scholar-form', '#calculator').hide();
//      getElement('#paid-school-calculator', '#calculator').hide();
//      getElement('#calc-tuition-fees-row', '#calculator').hide();
//      getElement('#calc-yellow-ribbon-row', '#calculator').hide();
//      getElement('#calc-yellow-ribbon-va-row', '#calculator').hide();
//      getElement('#calc-paid-to-school-total-row', '#calculator').hide();
//      getElement('#calc-tuition-fees-scholarship-row', '#calculator').hide();
//      getElement('#calc-tuition-fees-charged-row', '#calculator').hide();
//      getElement('#calc-out-of-pocket-row', '#calculator').hide();
//      getElement('#calc-paid-to-you-total-row', '#calculator').hide();
//      getElement('#paid-to-you-calculator', '#calculator').hide();
//      getElement('#calc-term-total-row', '#calculator').hide();
    }

    if (calculated.institution_type == 'flight' ||
        calculated.institution_type == 'correspond') {
      getElement('#online-classes').hide();
//      getElement('#enrolled-form', '#calculator').hide();
//      getElement('#kicker-elig-form', '#calculator').hide();
    }

    /*
    if (calculated.institution_type == 'public') {
      getElement('#in-state', '#calculator').show();
      if (!formData.in_state) {
        getElement('#in-state-tuition-fees-form', '#calculator').show();
      }
    }
    */

    /*
    if (institution.yr && calculated.tier == 1.0) {
      getElement('#yellow-ribbon-recipient-form', '#calculator').show();
      if (formData.yellow_ribbon) {
        getElement('#yellow-ribbon-amount-form', '#calculator').show();
        getElement('#yellow-ribbon-rates-link', '#calculator').show();
      }
    }

    if (calculated.institution_type != 'ojt' && formData.calendar == 'nontraditional') {
      getElement('#number-non-traditional-terms-form', '#calculator').show();
      getElement('#length-non-traditional-terms-form', '#calculator').show();
    }

    if (formData.kicker_elig) {
      getElement('#kicker-form', '#calculator').show();
    }

    if (globalFormData.military_status == 'active duty' ||
        globalFormData.military_status == 'national guard / reserves') {
      getElement('#tuition-assist-form', '#calculator').show();
    }

    if (!calculated.yellow_ribbon_elig) {
      getElement('#calc-yellow-ribbon-row', '#calculator').hide();
      getElement('#calc-yellow-ribbon-va-row', '#calculator').hide();
    }

    if (calculated.total_scholarship_ta == 0) {
      getElement('#calc-tuition-fees-scholarship-row', '#calculator').hide();
    }

    // Calculator

    getElement('#paid-to-school-td', '#calculator').prop('colspan', 3);
    getElement('#tuition-fees-charged-td', '#calculator').prop('colspan', 3);
    getElement('#total-left-to-pay-td', '#calculator').prop('colspan', 3);
    getElement('#total-paid-to-you-td', '#calculator').prop('colspan', 3);
    getElement('#total-year-td', '#calculator').prop('colspan', 3);

    if (calculated.number_of_terms == 1) {
      getElement('#term2', '#calculator').hide();
      getElement('#term3', '#calculator').hide();
      getElement('#tuition-fees-term-2', '#calculator').hide();
      getElement('#tuition-fees-term-3', '#calculator').hide();
      getElement('#yr-ben-term-2', '#calculator').hide();
      getElement('#yr-ben-term-3', '#calculator').hide();
      getElement('#yr-ben-term-va-2', '#calculator').hide();
      getElement('#yr-ben-term-va-3', '#calculator').hide();
      getElement('#housing-allow-term-2', '#calculator').hide();
      getElement('#housing-allow-term-3', '#calculator').hide();
      getElement('#book-stipend-term-2', '#calculator').hide();
      getElement('#book-stipend-term-3', '#calculator').hide();
      getElement('#total-term-2', '#calculator').hide();
      getElement('#total-term-3', '#calculator').hide();
      getElement('#paid-to-school-td', '#calculator').prop('colspan', 1);
      getElement('tuition-fees-scholarship-td', '#calculator').prop('colspan', 1);
      getElement('#tuition-fees-charged-td', '#calculator').prop('colspan', 1);
      getElement('#total-left-to-pay-td', '#calculator').prop('colspan', 1);
      getElement('#total-paid-to-you-td', '#calculator').prop('colspan', 1);
      getElement('#total-year-td', '#calculator').prop('colspan', 1);
    }

    if (calculated.number_of_terms < 3 && calculated.institution_type != 'ojt') {
      getElement('#term3', '#calculator').hide();
      getElement('#tuition-fees-term-3', '#calculator').hide();
      getElement('#yr-ben-term-3', '#calculator').hide();
      getElement('#yr-ben-term-va-3', '#calculator').hide();
      getElement('#housing-allow-term-3', '#calculator').hide();
      getElement('#book-stipend-term-3', '#calculator').hide();
      getElement('#total-term-3', '#calculator').hide();
      getElement('#paid-to-school-td', '#calculator').prop('colspan', 2);
      getElement('tuition-fees-scholarship-td', '#calculator').prop('colspan', 2);
      getElement('#tuition-fees-charged-td', '#calculator').prop('colspan', 2);
      getElement('#total-left-to-pay-td', '#calculator').prop('colspan', 2);
      getElement('#total-paid-to-you-td', '#calculator').prop('colspan', 2);
      getElement('#total-year-td', '#calculator').prop('colspan', 2);
    }
    */

    // Veteran Indicators  /////////

    // Vet Success
    if (institution.vetsuccess_name) {
      getElement('#vet-success-row', '#veteran-indicators').show();
    }

    // 8 Keys
    if (institution.eight_keys) {
     getElement('#eight-keys-row', '#veteran-indicators').show();
    }

    // School Indicators
    if (institution.indicator_group === null ||
        institution.indicator_group == 4) {
      getElement('#graduation-rates-chart', '#school-indicators').html('<p>Not Reported</p>');
      getElement('#loan-default-rates-chart', '#school-indicators').html('<p>Not Reported</p>');
      getElement('#median-borrowing-chart', '#school-indicators').html('<p>Not Reported</p>');

    // Draw the charts
    } else {
  /*
   * Draw the graduation rate chart
   */
  var drawGraduationRate = function () {
    var gradMed, gradHigh,
        gradRankMax, gradRankMed, gradRankHigh,
        gradCategory;

    switch (institution.indicator_group) {
      case 1:
        gradMed  = GROUP1GRADMED;
        gradHigh = GROUP1GRADHIGH;
        gradRankMax  = GROUP1GRADRANKMAX;
        gradRankMed  = GROUP1GRADRANKMED;
        gradRankHigh = GROUP1GRADRANKHIGH;
        break;
      case 2:
        gradMed  = GROUP2GRADMED;
        gradHigh = GROUP2GRADHIGH;
        gradRankMax  = GROUP2GRADRANKMAX;
        gradRankMed  = GROUP2GRADRANKMED;
        gradRankHigh = GROUP2GRADRANKHIGH;
        break;
      case 3:
        gradMed  = GROUP3GRADMED;
        gradHigh = GROUP3GRADHIGH;
        gradRankMax  = GROUP3GRADRANKMAX;
        gradRankMed  = GROUP3GRADRANKMED;
        gradRankHigh = GROUP3GRADRANKHIGH;
        break;
      case 5:
        gradMed  = GROUP5GRADMED;
        gradHigh = GROUP5GRADHIGH;
        gradRankMax  = GROUP5GRADRANKMAX;
        gradRankMed  = GROUP5GRADRANKMED;
        gradRankHigh = GROUP5GRADRANKHIGH;
        break;
    }

    if (institution.grad_rate >= gradHigh) {
      gradCategory = 'high';
    } else if (institution.grad_rate >= gradMed) {
      gradCategory = 'medium';
    } else {
      gradCategory = 'low';
    }

    var attr = 'Graduation rate is ' + gradCategory + '.';
    getElement('#graduation-rates-chart', '#school-indicators').attr({
      alt: attr,
      title: attr
    });

    var pt = institution.grad_rate_rank,
        el, ui, pos;

    var indent = 30,
        w = 80,
        h = 30,
        y = 69;

    var xText = indent + 40;
    var yText = y + 15;

    switch (gradCategory) {
      case 'high':
        el = { min: gradRankHigh, max: 1 };
        ui = { min: 190, max: 190 + w };
        pos = mapPt(pt, el, ui);
        break;
      case 'medium':
        el = { min: gradRankMed, max: gradRankHigh };
        ui = { min: 110, max: 110 + w };
        pos = mapPt(pt, el, ui);
        break;
      case 'low':
        el = { min: gradRankMax, max: gradRankMed };
        ui = { min: 30, max: 30 + w };
        pos = mapPt(pt, el, ui);
        break;
    }

    getElement('#graduation-rates-chart', '#school-indicators').empty();
    var canvas = Raphael('graduation-rates-chart', 300, 100);

    // Draw static elements
    canvas.add([
      // Low rect
      {
        type: 'rect',
        x: indent,
        y: y,
        width: w,
        height: h,
        fill: lightBlue,
        stroke: '#000'
      },
      // Medium rect
      {
        type: 'rect',
        x: indent + w,
        y: y,
        width: w,
        height: h,
        fill: mediumBlue,
        stroke: '#000'
      },
      // High rect
      {
        type: 'rect',
        x: indent + (w * 2),
        y: y,
        width: w,
        height: h,
        fill: darkBlue,
        stroke: '#000'
      },
      // "LOW" text
      {
        type: 'text',
        text: 'LOW',
        x: xText,
        y: yText,
        'font-family': font,
        'font-size': 12,
        fill: '#fff'
      },
      // "MEDIUM" text
      {
        type: 'text',
        text: 'MEDIUM',
        x: xText + w,
        y: yText,
        'font-family': font,
        'font-size': 12,
        fill: '#fff'
      },
      // "HIGH" text
      {
        type: 'text',
        text: 'HIGH',
        x: xText + (w * 2),
        y: yText,
        'font-family': font,
        'font-size': 12,
        fill: '#fff'
      }
    ]);

    // Draw dynamic elements

    // Arrow
    var arrow = canvas.path('M0,0 L16,0 L8,10 L0,0');
    arrow.attr({
      fill: darkGray,
      stroke: 'none'
    });
    arrow.translate(pos - 8, y - 13);

    // Percentage
    var percentage = canvas.text(pos, 46, institution.grad_rate + "%");
    percentage.attr({
      'font-family': font,
      'font-size': 16,
      fill: darkGray
    });
  };


  /*
   * Draw the loan default rates chart
   */
  var drawLoanDefaultRates = function () {
    var attr = 'Default rate is ' + institution.default_rate +
               '%, compared to the national average of ' + CDRAVG + '%.';
    getElement('#loan-default-rates-chart', '#school-indicators').attr({
      alt: attr,
      title: attr
    });

    getElement('#loan-default-rates-chart', '#school-indicators').empty();

    var canvas = Raphael('loan-default-rates-chart', 300, 200);

    var schoolBarHeight = (institution.default_rate / 100) * 145,
        nationalBarHeight = (CDRAVG / 100) * 145;

    canvas.add([
      // Bottom horizontal bar
      {
        type: 'rect',
        x: 25,
        y: 145,
        width: 250,
        height: 4,
        fill: darkGray,
        stroke: 'none'
      },
      // "THIS SCHOOL" text
      {
        type: 'text',
        text: 'THIS SCHOOL',
        x: 88,
        y: 160,
        'font-family': font,
        'font-size': 12,
        fill: darkGray
      },
      // "NATIONAL AVERAGE" text
      {
        type: 'text',
        text: 'NATIONAL AVERAGE',
        x: 220,
        y: 160,
        'font-family': font,
        'font-size': 12,
        fill: darkGray
      },
      // This school bar
      {
        type: 'rect',
        x: 50,
        y: 145 - schoolBarHeight,
        width: 75,
        height: schoolBarHeight,
        fill: mediumBlue,
        stroke: 'none'
      },
      // This school percentage
      {
        type: 'text',
        text: institution.default_rate + "%",
        x: 90,
        y: 177,
        'font-family': font,
        'font-size': 16,
        fill: darkGray
      },
      // National average bar
      {
        type: 'rect',
        x: 175,
        y: 145 - nationalBarHeight,
        width: 75,
        height: nationalBarHeight,
        fill: darkGray,
        stroke: 'none'
      },
      // National average percentage
      {
        type: 'text',
        text: CDRAVG + "%",
        x: 215,
        y: 177,
        'font-family': font,
        'font-size': 16,
        fill: darkGray
      }
    ]);
  };


  /*
   * Draw the median borrowing chart
   */
  var drawMedianBorrowingChart = function () {
    var loanMed, loanHigh,
        loanRankMax, loanRankMed, loanRankHigh,
        loanCategory;

    switch (institution.indicator_group) {
      case 1:
        loanMed  = GROUP1LOANMED;
        loanHigh = GROUP1LOANHIGH;
        loanRankMax  = GROUP1LOANRANKMAX;
        loanRankMed  = GROUP1LOANRANKMED;
        loanRankHigh = GROUP1LOANRANKHIGH;
        break;
      case 2:
        loanMed  = GROUP2LOANMED;
        loanHigh = GROUP2LOANHIGH;
        loanRankMax  = GROUP2LOANRANKMAX;
        loanRankMed  = GROUP2LOANRANKMED;
        loanRankHigh = GROUP2LOANRANKHIGH;
        break;
      case 3:
        loanMed  = GROUP3LOANMED;
        loanHigh = GROUP3LOANHIGH;
        loanRankMax  = GROUP3LOANRANKMAX;
        loanRankMed  = GROUP3LOANRANKMED;
        loanRankHigh = GROUP3LOANRANKHIGH;
        break;
      case 5:
        loanMed  = GROUP5LOANMED;
        loanHigh = GROUP5LOANHIGH;
        loanRankMax  = GROUP5LOANRANKMAX;
        loanRankMed  = GROUP5LOANRANKMED;
        loanRankHigh = GROUP5LOANRANKHIGH;
        break;
    }

    if (institution.avg_stu_loan_debt >= loanHigh) {
      loanCategory = 'high';
    } else if (institution.avg_stu_loan_debt >= loanMed) {
      loanCategory = 'medium';
    } else {
      loanCategory = 'low';
    }

    var attr = 'Median Borrowing is ' + loanCategory + '.';
    getElement('#median-borrowing-chart', '#school-indicators').attr({
      alt: attr,
      title: attr
    });

    var pt = institution.avg_stu_loan_debt_rank,
        el, ui, pos;

    switch (loanCategory) {
      case 'high':
        el = { min: loanRankHigh, max: loanRankMax };
        ui = { min: 120, max: 180 };
        pos = mapPt(pt, el, ui);
        break;
      case 'medium':
        el = { min: loanRankMed, max: loanRankHigh };
        ui = { min: 60, max: 120 };
        pos = mapPt(pt, el, ui);
        break;
      case 'low':
        el = { min: 1, max: loanRankMed };
        ui = { min: 0, max: 60 };
        pos = mapPt(pt, el, ui);
        break;
    }

    getElement('#median-borrowing-chart', '#school-indicators').empty();
    var canvas = Raphael('median-borrowing-chart', 300, 150);

    canvas.add([
      // Low wedge
      {
        type: 'path',
        path: wedgePath(150, 120, 180, 240, 100),
        fill: lightBlue,
        stroke: 'none'
      },
      // Medium wedge
      {
        type: 'path',
        path: wedgePath(150, 120, 240, 300, 100),
        fill: mediumBlue,
        stroke: 'none'
      },
      // High wedge
      {
        type: 'path',
        path: wedgePath(150, 120, 300, 360, 100),
        fill: darkBlue,
        stroke: 'none'
      },
      // "LOW" text
      {
        type: 'text',
        text: 'LOW',
        x: 85,
        y: 85,
        'font-family': font,
        'font-size': 12,
        fill: '#fff'
      },
      // "MEDIUM" text
      {
        type: 'text',
        text: 'MEDIUM',
        x: 150,
        y: 50,
        'font-family': font,
        'font-size': 12,
        fill: '#fff'
      },
      // "HIGH" text
      {
        type: 'text',
        text: 'HIGH',
        x: 215,
        y: 85,
        'font-family': font,
        'font-size': 12,
        fill: '#fff'
      },
      // Amount text
      {
        type: 'text',
        text: formatCurrency(institution.avg_stu_loan_debt),
        x: 150,
        y: 135,
        'font-family': font,
        'font-weight': 'bold',
        'font-size': 18,
        fill: darkGray
      }
    ]);

    // Arrow
    var arrow = canvas.path('M25,0 L25,10 L-25,5 L25,0');
    arrow.attr({
      fill: '#fff',
      stroke: '#fff',
      'stroke-width': 2
    });
    arrow.transform('t125,110');

    // Calculate rotation point
    var arrowBox = arrow.getBBox();
    var xRotatePoint = arrowBox.x + arrowBox.width;
    var yRotatePoint = arrowBox.y + arrowBox.height / 2;
    arrow.transform(arrow.attr('transform')+'t'+(arrowBox.height / 2)+',0'+
                    'R'+pos+','+xRotatePoint+','+yRotatePoint);

    // Small gray circle
    canvas.add([{
      type: 'path',
      path: wedgePath(150, 120, 180, 360, 15),
      fill: darkGray,
      stroke: 'none'
    }]);
  };


  /*
   * Creates an SVG wedge path
   * Adapted from: stackoverflow.com/questions/13092979/svg-javascript-pie-wedge-generator
   */
  var wedgePath = function (x, y, startAngle, endAngle, r) {
    var x1 = x + r * Math.cos(Math.PI * startAngle / 180),
        y1 = y + r * Math.sin(Math.PI * startAngle / 180),
        x2 = x + r * Math.cos(Math.PI * endAngle / 180),
        y2 = y + r * Math.sin(Math.PI * endAngle / 180);

    return 'M'+x+' '+y+' L'+x1+' '+y1+' A'+r+' '+r+' 0 0 1 '+x2+' '+y2+' z';
  };


  /*
   * Maps a point to an underlying pixel grid
   * Parameters:
   *   pt  Number
   *   el  Object  { min: Number, max: Number }
   *   ui  Object  { min: Number, max: Number }
   */
  var mapPt = function(pt, el, ui) {
    return (pt - el.min) * ((ui.max - ui.min) / (el.max - el.min)) + ui.min;
  };

      if (institution.grad_rate !== null) {
        drawGraduationRate();
      } else {
        getElement('#graduation-rates-chart', '#school-indicators').html('<p>Not Reported</p>');
      }

      if (institution.default_rate !== null) {
        drawLoanDefaultRates();
      } else {
        getElement('#loan-default-rates-chart', '#school-indicators').html('<p>Not Reported</p>');
      }

      if (institution.avg_stu_loan_debt !== null) {
        drawMedianBorrowingChart();
      } else {
        getElement('#median-borrowing-chart', '#school-indicators').html('<p>Not Reported</p>');
      }
    }

    // More information about school link
    getElement('#navigator-link', '#school-indicators').html(
      "<p><a href='http://nces.ed.gov/collegenavigator/?id=" +
      institution.cross +
      "' onclick=\"track('Tool Tips', 'School Indicators / College Navigator');\" target='newtab'>More information about your school &raquo;</a></p>");
  };

  this.updateValues = function() {
    /*
     * Format location of the institution
     */
    var formatLocation = function () {
      if (institution.country != 'USA') {
        calculated.location = '' + institution.city + ', ' +
                                   institution.country;
      } else {
        calculated.location = '' + institution.city + ', ' +
                                   institution.state;
      }
    };

    /*
     * Determine the type of institution
     */
    var getInstitutionType = function () {
      if (institution.facility_code[1] == '0') {
        calculated.institution_type = 'ojt';
      } else if (institution.flight) {
        calculated.institution_type = 'flight';
      } else if (institution.correspondence) {
        calculated.institution_type = 'correspond';
      } else if (institution.country != 'USA') {
        calculated.institution_type = 'foreign';
      } else {
        switch (institution.facility_code[0]) {
          case '1':
            calculated.institution_type = 'public';
            break;
          case '2':
            calculated.institution_type = 'private';
            break;
          case '3':
            calculated.institution_type = 'private';
            break;
        }
      }
    };


    /*
     * Determine the type of institution for display
     */
    var getInstitutionTypeForDisplay = function () {
      if (institution.facility_code[1] == '0') {
        calculated.institution_type_display = 'OJT / Apprenticeship';
      } else if (institution.flight) {
        calculated.institution_type_display = 'Flight';
      } else if (institution.correspondence) {
        calculated.institution_type_display = 'Correspondence';
      } else if (institution.country != 'USA') {
        calculated.institution_type_display = 'Foreign';
      } else {
        switch (institution.facility_code[0]) {
          case '1':
            calculated.institution_type_display = 'Public School';
            break;
          case '2':
            calculated.institution_type_display = 'For Profit School';
            break;
          case '3':
            calculated.institution_type_display = 'Private School';
            break;
        }
      }
    };


    /*
     * Determine the type of institution for search
     */
    var getInstitutionTypeForSearch = function (facility_code) {
      if (facility_code[1] == "0") {
        return "ojt";
      } else {
        return "school";
      }
    };


    /*
     * Calculate the tier
     */
    var getTier = function () {
      if (formData.cumulative_service == 'service discharge') {
        calculated.tier = 1;
        calculated.service_discharge = true;
      } else {
        calculated.tier = parseFloat(formData.cumulative_service);
      }
    };


    /*
     * Calculates the estimated tuition and fees
     */
    var getTuitionFees = function () {
      if (calculated.institution_type == 'ojt') {
        calculated.est_tuition_fees = '';
      } else if (calculated.institution_type == 'flight') {
        calculated.est_tuition_fees = formatCurrency(FLTTFCAP * calculated.tier) + ' / year (up to)';
      } else if (calculated.institution_type == 'correspond') {
        calculated.est_tuition_fees = formatCurrency(CORRESPONDTFCAP * calculated.tier) + ' / year (up to)';
      } else if (calculated.institution_type == 'public' && institution.country == 'USA') {
        calculated.est_tuition_fees = Math.round(calculated.tier * 100) + '% of instate tuition';
      } else {
        calculated.est_tuition_fees = formatCurrency(TFCAP * calculated.tier) + ' / year (up to)';
      }
    };


    /*
     * Calculate the estimated housing allowance
     */
    var getHousingAllowance = function () {
      if (formData.military_status == 'active duty') {
        calculated.est_housing_allowance = '$0 / month';
      } else if (formData.military_status == 'spouse' && formData.spouse_active_duty) {
        calculated.est_housing_allowance = '$0 / month';
      } else if (calculated.institution_type == 'flight') {
        calculated.est_housing_allowance = '$0 / month';
      } else if (calculated.institution_type == 'correspond') {
        calculated.est_housing_allowance = '$0 / month';
      } else if (calculated.institution_type == 'ojt') {
        calculated.est_housing_allowance = formatCurrency(calculated.tier * institution.bah) + ' / month';
      } else if (formData.online) {
        calculated.est_housing_allowance = formatCurrency(calculated.tier * AVGBAH / 2) + ' / month (full time)';
      } else if (institution.country != 'USA') {
        calculated.est_housing_allowance = formatCurrency(calculated.tier * AVGBAH) + ' / month (full time)';
      } else {
        calculated.est_housing_allowance = formatCurrency(calculated.tier * institution.bah) + ' / month (full time)';
      }
    };


    /*
     * Calculate the estimated book stipend
     */
    var getBookStipend = function () {
      if (calculated.institution_type == 'flight') {
        calculated.est_book_stipend = '$0 / year';
      } else if (calculated.institution_type == 'correspond') {
        calculated.est_book_stipend = '$0 / year';
      } else {
        calculated.est_book_stipend = formatCurrency(calculated.tier * BSCAP) + ' / year';
      }
    };


    /*
     * Calculate the prepopulated value out-of-state tuiton rates
     */
    var getTuitionOutOfState = function () {
        calculated.tuition_out_of_state = institution.tuition_out_of_state;
    };


    /*
     * Calculate the total number of academic terms
     */
    var getNumberOfTerms = function () {
      if (formData.calendar == 'semesters') {
        calculated.number_of_terms = 2;
      } else if (formData.calendar == 'quarters')  {
        calculated.number_of_terms = 3;
      } else if (formData.calendar == 'nontraditional') {
        calculated.number_of_terms = formData.number_nontrad_terms;
      } else if (calculated.institution_type == 'ojt') {
        calculated.number_of_terms = 4;
      }
    };


    /*
     * Set the net price (Payer of Last Resort)
     */
    var getTuitionNetPrice = function () {
      calculated.tuition_net_price = Math.max(0, Math.min(
        formData.tuition_fees - formData.scholar - formData.tuition_assist
      ));
    };


    /*
     * Set the proper tuition/fees cap
     */
    var getTuitionFeesCap = function () {
     if (calculated.institution_type == 'flight') {
       calculated.tuition_fees_cap = FLTTFCAP;
     } else if (calculated.institution_type == 'correspond') {
       calculated.tuition_fees_cap = CORRESPONDTFCAP;
     } else if (calculated.institution_type == 'public' && institution.country == 'USA' && formData.in_state) {
       calculated.tuition_fees_cap = formData.tuition_fees;
     } else if (calculated.institution_type == 'public' && institution.country == 'USA' && !formData.in_state) {
       calculated.tuition_fees_cap = formData.in_state_tuition_fees;
     } else if (calculated.institution_type == 'private' || calculated.institution_type == 'foreign') {
       calculated.tuition_fees_cap = TFCAP;
     }
    };


    /*
     * Calculate the tuition/fees per term
     */
    var getTuitionFeesPerTerm = function () {
      calculated.tuition_fees_per_term = formData.tuition_fees / calculated.number_of_terms;
    };


    /*
     * Calculate the length of each term
     */
    var getTermLength = function () {
      if (formData.calendar == 'semesters') {
        calculated.term_length = 4.5;
      } else if (formData.calendar == 'quarters')  {
        calculated.term_length = 3;
      } else if (formData.calendar == 'nontraditional') {
        calculated.term_length = formData.length_nontrad_terms;
      } else if (calculated.institution_type == 'ojt') {
        calculated.term_length = 6;
      }
    };


    /*
     * Calculate the length of the academic year
     */
    var getAcadYearLength = function () {
      if (formData.calendar == 'nontraditional') {
        calculated.acad_year_length = formData.number_nontrad_terms * formData.length_nontrad_terms;
      } else {
        calculated.acad_year_length = 9;
      }
    };


   /*
     * Calculate the rate of pursuit for Book Stipend
     */
    var getRopBook = function () {
      if (formData.rop == 1) {
        calculated.rop_book = 1;
      } else if (formData.rop == 0.8) {
        calculated.rop_book = 0.75;
      } else if (formData.rop == 0.6) {
        calculated.rop_book = 0.50;
      } else if (formData.rop == 0) {
        calculated.rop_book = 0.25;
      }
    };


    /*
     * Calculate the rate of pursuit for OJT
     */
    var getRopOjt = function () {
      calculated.rop_ojt = formData.ojt_working / 30;
    };


    /*
     * Determine yellow ribbon eligibility
     */
    var getYellowRibbonEligibility = function () {
      if (calculated.tier < 1 || !institution.yr || !formData.yellow_ribbon || formData.military_status == 'active duty') {
        calculated.yellow_ribbon_elig = false;
      } else if (calculated.institution_type == 'ojt' || calculated.institution_type == 'flight' || calculated.institution_type == 'correspond') {
        calculated.yellow_ribbon_elig = false;
      } else {
        calculated.yellow_ribbon_elig = true;
      }
    };


    /*
     * Determine kicker benefit level
     */
    var getKickerBenefit = function () {
      if (!formData.kicker_elig) {
        calculated.kicker_benefit = 0;
      } else {
        calculated.kicker_benefit = formData.kicker;
      }
    };


    /*
     * Calculate the name of Term #1
     */
    var getTerm1 = function () {
      if (calculated.institution_type == 'ojt') {
        calculated.term1 = 'Months 1-6';
      } else if (formData.calendar == 'semesters') {
        calculated.term1 = 'Fall';
      } else if (formData.calendar == 'quarters') {
        calculated.term1 = 'Fall';
      } else if (formData.calendar == 'nontraditional') {
        calculated.term1 = 'Term 1';
      }
    };


    /*
     * Calculate the name of Term #2
     */
    var getTerm2 = function () {
      if (calculated.institution_type == 'ojt') {
        calculated.term2 = 'Months 7-12';
      } else if (formData.calendar == 'semesters') {
        calculated.term2 = 'Spring';
      } else if (formData.calendar == 'quarters')  {
        calculated.term2 = 'Winter';
      } else if (formData.calendar == 'nontraditional') {
        calculated.term2 = 'Term 2';
      }
    };


    /*
     * Calculate the name of Term #3
     */
    var getTerm3 = function () {
      if (calculated.institution_type == 'ojt') {
        calculated.term3 = 'Months 13-18';
      } else if (formData.calendar == 'semesters') {
        calculated.term3 = '';
      } else if (formData.calendar == 'quarters')  {
        calculated.term3 = 'Spring';
      } else if (formData.calendar == 'nontraditional') {
        calculated.term3 = 'Term 3';
      }
    };


    /*
     * Calculate the name of Term #4
     */
    var getTerm4 = function () {
      if (calculated.institution_type == 'ojt') {
        calculated.term4 = 'Months 19-24';
      } else {
        calculated.term4 = 'Total (/Yr)';
      }
    };


    /*
     * Calculate Tuition Fees for Term #1
     */
    var getTuitionFeesTerm1 = function () {
      if (calculated.institution_type == 'ojt') {
        calculated.tuition_fees_term_1 = 0;
      } else {
        calculated.tuition_fees_term_1 =
        Math.max(0, Math.min(
        calculated.tier * calculated.tuition_fees_per_term,
        calculated.tier * calculated.tuition_fees_cap,
        calculated.tier * calculated.tuition_net_price
        ));
      }
    };



    /*
     * Calculate Tuition Fees for Term #2
     */
    var getTuitionFeesTerm2 = function () {
      if (calculated.institution_type == 'ojt') {
        calculated.tuition_fees_term_2 = 0;
      } else if (formData.calendar == 'nontraditional' && calculated.number_of_terms == 1) {
        calculated.tuition_fees_term_2 = 0;
      } else {
        calculated.tuition_fees_term_2 =
        Math.max(0, Math.min(
        calculated.tier * calculated.tuition_fees_per_term,
        calculated.tier * calculated.tuition_fees_cap - calculated.tuition_fees_term_1,
        calculated.tier * calculated.tuition_net_price - calculated.tuition_fees_term_1
        ));
      }
    };


    /*
     * Calculate Tuition Fees for Term #3
     */
    var getTuitionFeesTerm3 = function () {
      if (calculated.institution_type == 'ojt') {
        calculated.tuition_fees_term_3 = 0;
      } else if (formData.calendar == 'semesters' || (formData.calendar == 'nontraditional' && calculated.number_of_terms < 3)) {
        calculated.tuition_fees_term_3 = 0;
      } else {
        calculated.tuition_fees_term_3 =
        Math.max(0, Math.min(
        calculated.tier * calculated.tuition_fees_per_term,
        calculated.tier * calculated.tuition_fees_cap - calculated.tuition_fees_term_1 - calculated.tuition_fees_term_2,
        calculated.tier * calculated.tuition_net_price - calculated.tuition_fees_term_1 - calculated.tuition_fees_term_2
        ));
      }
    };


    /*
     * Calculate the name of Tuition Fees Total
     */
    var getTuitionFeesTotal = function () {
      calculated.tuition_fees_total = calculated.tuition_fees_term_1 +
                                      calculated.tuition_fees_term_2 +
                                      calculated.tuition_fees_term_3;
    };


    /*
     * Calculate Yellow Ribbon for Term #1
     */
    var getYrBenTerm1 = function () {
      if (!calculated.yellow_ribbon_elig || formData.yellow_ben == 0) {
        calculated.yr_ben_term_1 = 0;
      } else if (calculated.tuition_fees_per_term == calculated.tuition_fees_term_1) {
        calculated.yr_ben_term_1 = 0;
      } else {
        calculated.yr_ben_term_1 = Math.max(0, Math.min(
          calculated.tuition_fees_per_term - calculated.tuition_fees_term_1,
          calculated.tuition_net_price - calculated.tuition_fees_term_1,
          formData.yellow_ben * 2
          ));
      }
    };


    /*
     * Calculate Yellow Ribbon for Term #2
     */
    var getYrBenTerm2 = function () {
      if (!calculated.yellow_ribbon_elig || formData.yellow_ben == 0) {
        calculated.yr_ben_term_2 = 0;
      } else if (formData.calendar == 'nontraditional' && calculated.number_of_terms == 1) {
        calculated.yr_ben_term_2 = 0;
      } else if (calculated.tuition_fees_per_term == calculated.tuition_fees_term_2) {
        calculated.yr_ben_term_2 = 0;
      } else {
        calculated.yr_ben_term_2 = Math.max(0, Math.min(
            calculated.tuition_fees_per_term - calculated.tuition_fees_term_2,
            calculated.tuition_net_price - calculated.tuition_fees_term_1 - calculated.tuition_fees_term_2 - calculated.yr_ben_term_1,
            formData.yellow_ben * 2 - calculated.yr_ben_term_1
            ));
      }
    };


    /*
     * Calculate Yellow Ribbon for Term #3
     */
    var getYrBenTerm3 = function () {
      if (!calculated.yellow_ribbon_elig || formData.yellow_ben == 0) {
        calculated.yr_ben_term_3 = 0;
      } else if (formData.calendar == 'semesters' || (formData.calendar == 'nontraditional' && calculated.number_of_terms < 3)) {
        calculated.yr_ben_term_3 = 0;
      } else if (calculated.tuition_fees_per_term == calculated.tuition_fees_term_3) {
        calculated.yr_ben_term_3 = 0;
      } else {
        calculated.yr_ben_term_3 = Math.max(0, Math.min(
          calculated.tuition_fees_per_term - calculated.tuition_fees_term_3,
          calculated.tuition_net_price - calculated.tuition_fees_term_1 - calculated.tuition_fees_term_2 - calculated.tuition_fees_term_3 - calculated.yr_ben_term_1 - calculated.yr_ben_term_2,
          formData.yellow_ben * 2 - calculated.yr_ben_term_1 - calculated.yr_ben_term_2
          ));
      }
    };


    /*
     * Calculate Yellow Ribbon for the Year
     */
    var getYrBenTotal = function () {
      if (!calculated.yellow_ribbon_elig || formData.yellow_ben == 0) {
        calculated.yr_ben_total = 0;
      } else {
        calculated.yr_ben_total = calculated.yr_ben_term_1 +
                                  calculated.yr_ben_term_2 +
                                  calculated.yr_ben_term_3;
      }
    };


    /*
     * Calculate Yellow Ribbon by school / VA contributions
     */
    var getYrBreakdown = function () {
      calculated.yr_ben_school_term_1   =       calculated.yr_ben_term_1 / 2;
      calculated.yr_ben_va_term_1       =       calculated.yr_ben_term_1 / 2;
      calculated.yr_ben_school_term_2   =       calculated.yr_ben_term_2 / 2;
      calculated.yr_ben_va_term_2       =       calculated.yr_ben_term_2 / 2;
      calculated.yr_ben_school_term_3   =       calculated.yr_ben_term_3 / 2;
      calculated.yr_ben_va_term_3       =       calculated.yr_ben_term_3 / 2;
      calculated.yr_ben_school_total    =       calculated.yr_ben_total / 2;
      calculated.yr_ben_va_total        =       calculated.yr_ben_total / 2;
    };


    /*
     * Calculate Total Paid to School
     */
    var getTotalPaidToSchool = function () {
      calculated.total_to_school = calculated.tuition_fees_total + calculated.yr_ben_total;
    };

    /*
    * Calculate Total Scholarships and Tuition Assistance
    */
    var getTotalScholarships = function () {
      calculated.total_scholarship_ta = formData.scholar + formData.tuition_assist;
    };


    /*
     * Calculate Total Left to Pay
     */
    var getTotalLeftToPay = function () {
      calculated.total_left_to_pay = Math.max(0, formData.tuition_fees - calculated.total_to_school - formData.scholar - formData.tuition_assist);
    };



    /*
     * Calculate Housing Allowance for Term #1
     */
    var getHousingAllowTerm1 = function () {
      if (formData.military_status == 'active duty') {
        calculated.housing_allow_term_1 = (0 + calculated.kicker_benefit);
      } else if (formData.military_status == 'spouse' && formData.spouse_active_duty) {
        calculated.housing_allow_term_1 = (0 + calculated.kicker_benefit);
      } else if (calculated.institution_type == 'flight' || calculated.institution_type == 'correspond') {
        calculated.housing_allow_term_1 = 0;
      } else if (calculated.institution_type == 'ojt') {
        calculated.housing_allow_term_1 = calculated.rop_ojt * (calculated.tier * institution.bah + calculated.kicker_benefit);
      } else if (formData.online) {
        calculated.housing_allow_term_1 = formData.rop * (calculated.tier * AVGBAH / 2 + calculated.kicker_benefit);
      } else if (institution.country != 'USA') {
        calculated.housing_allow_term_1 = formData.rop * ((calculated.tier * AVGBAH) + calculated.kicker_benefit);
      } else {
        calculated.housing_allow_term_1 = formData.rop * ((calculated.tier * institution.bah) + calculated.kicker_benefit);
      }
    };


    /*
     * Calculate Housing Allowance for Term #2
     */
    var getHousingAllowTerm2 = function () {
      if (formData.military_status == 'active duty') {
        calculated.housing_allow_term_2 = (0 + calculated.kicker_benefit);
      } else if (formData.military_status == 'spouse' && formData.spouse_active_duty) {
        calculated.housing_allow_term_2 = (0 + calculated.kicker_benefit);
      } else if (calculated.institution_type == 'flight' || calculated.institution_type == 'correspond') {
        calculated.housing_allow_term_2 = 0;
      } else if (calculated.institution_type == 'ojt') {
        calculated.housing_allow_term_2 = 0.8 * calculated.rop_ojt * (calculated.tier * institution.bah + calculated.kicker_benefit);
      } else if (formData.calendar == 'nontraditional' && calculated.number_of_terms == 1) {
        calculated.housing_allow_term_2 = 0;
      } else if (formData.online) {
        calculated.housing_allow_term_2 = formData.rop * (calculated.tier * AVGBAH/ 2 + calculated.kicker_benefit);
      } else if (institution.country != 'USA') {
        calculated.housing_allow_term_2 = formData.rop * (calculated.tier * AVGBAH + calculated.kicker_benefit);
      } else {
        calculated.housing_allow_term_2 = formData.rop * (calculated.tier * institution.bah + calculated.kicker_benefit);
      }
    };


    /*
     * Calculate Housing Allowance for Term #3
     */
    var getHousingAllowTerm3 = function () {
      if (formData.military_status == 'active duty') {
        calculated.housing_allow_term_3 = (0 + calculated.kicker_benefit);
      } else if (formData.military_status == 'spouse' && formData.spouse_active_duty) {
        calculated.housing_allow_term_3 = (0 + calculated.kicker_benefit);
      } else if (calculated.institution_type == 'flight' || calculated.institution_type == 'correspond') {
        calculated.housing_allow_term_3 = 0;
      } else if (calculated.institution_type == 'ojt') {
        calculated.housing_allow_term_3 = 0.6 * calculated.rop_ojt * (calculated.tier * institution.bah + calculated.kicker_benefit);
      } else if (formData.calendar == 'semesters') {
        calculated.housing_allow_term_3 = 0;
      } else if (formData.calendar == 'nontraditional' && calculated.number_of_terms < 3) {
        calculated.housing_allow_term_3 = 0;
      } else if (formData.online) {
        calculated.housing_allow_term_3 = formData.rop * (calculated.tier * AVGBAH / 2 + calculated.kicker_benefit);
      } else if (institution.country != 'USA') {
        calculated.housing_allow_term_3 = formData.rop * (calculated.tier * AVGBAH + calculated.kicker_benefit);
      } else {
        calculated.housing_allow_term_3 = formData.rop * (calculated.tier * institution.bah + calculated.kicker_benefit);
      }
    };


    /*
     * Calculate Housing Allowance Total for year
     */
    var getHousingAllowTotal = function () {
      if (calculated.institution_type == 'ojt') {
        calculated.housing_allow_total = 0.4 * calculated.rop_ojt * (calculated.tier * institution.bah + calculated.kicker_benefit);
      } else {
        calculated.housing_allow_total = calculated.housing_allow_term_1 * calculated.acad_year_length;
      }
    };


    /*
     * Calculate Book Stipend for Term #1
     */
    var getBookStipendTerm1 = function () {
      if (calculated.institution_type == 'flight' || calculated.institution_type == 'correspond') {
        calculated.book_stipend_term_1 = 0;
      } else if (calculated.institution_type == 'ojt') {
        calculated.book_stipend_term_1 = BSOJTMONTH;
      } else {
        calculated.book_stipend_term_1 = calculated.rop_book * BSCAP / calculated.number_of_terms * calculated.tier;
      }
    };


    /*
     * Calculate Book Stipend for Term #2
     */
    var getBookStipendTerm2 = function () {
      if (calculated.institution_type == 'ojt') {
        calculated.book_stipend_term_2 = BSOJTMONTH;
      } else if (calculated.institution_type == 'flight' || calculated.institution_type == 'correspond') {
        calculated.book_stipend_term_2 = 0;
      } else if (formData.calendar == 'nontraditional' && calculated.number_of_terms == 1) {
        calculated.book_stipend_term_2 = 0;
      } else {
        calculated.book_stipend_term_2 = calculated.rop_book * BSCAP / calculated.number_of_terms * calculated.tier;
      }
    };


    /*
     * Calculate Book Stipend for Term #3
     */
    var getBookStipendTerm3 = function () {
      if  (calculated.institution_type == 'ojt') {
        calculated.book_stipend_term_3 = BSOJTMONTH;
      } else if (formData.calendar == 'semesters') {
        calculated.book_stipend_term_3 = 0;
      } else if (formData.calendar == 'nontraditional' && calculated.number_of_terms < 3) {
        calculated.book_stipend_term_3 = 0;
      } else if (calculated.institution_type == 'flight' || calculated.institution_type == 'correspond') {
        calculated.book_stipend_term_3 = 0;
      } else {
        calculated.book_stipend_term_3 = calculated.rop_book * BSCAP / calculated.number_of_terms * calculated.tier;
      }
    };


    /*
     * Calculate Book Stipend for Year
     */
    var getBookStipendYear = function () {
      if (calculated.institution_type == 'ojt') {
        calculated.book_stipend_total = BSOJTMONTH;
      } else {
        calculated.book_stipend_total = calculated.book_stipend_term_1 +
                                        calculated.book_stipend_term_2 +
                                        calculated.book_stipend_term_3;
      }
    };

    /*
     * Calculate Total Payments to You
     */
    var getTotalPaidToYou = function () {
      calculated.total_to_you = calculated.housing_allow_total + calculated.book_stipend_total;
    };


    /*
     * Calculate Total Benefits for Term 1
     */
    var getTotalTerm1 = function () {
      if (calculated.institution_type == 'ojt') {
        calculated.total_term_1 = 0;
      } else {
        calculated.total_term_1 = calculated.tuition_fees_term_1 +
                                  calculated.yr_ben_term_1 +
                                  calculated.housing_allow_term_1 * calculated.term_length +
                                  calculated.book_stipend_term_1;
      }
    };


    /*
     * Calculate Total Benefits for Term 2
     */
    var getTotalTerm2 = function () {
      if (formData.calendar == 'nontraditional' && calculated.number_of_terms == 1) {
        calculated.book_stipend_term_2 = 0;
      } else if (calculated.institution_type == 'ojt') {
        calculated.total_term_2 = 0;
      } else {
        calculated.total_term_2 = calculated.tuition_fees_term_2 +
                                  calculated.yr_ben_term_2 +
                                  (calculated.housing_allow_term_2 * calculated.term_length) +
                                  calculated.book_stipend_term_2;
      }
    };


    /*
     * Calculate Total Benefits for Term 3
     */
    var getTotalTerm3 = function () {
      if (formData.calendar == 'semesters') {
        calculated.total_term_3 = 0;
      } else if (formData.calendar == 'nontraditional' && calculated.number_of_terms < 3) {
        calculated.total_term_3 = 0;
      } else if (calculated.institution_type == 'ojt') {
        calculated.total_term_3 = 0;
      } else {
        calculated.total_term_3 = calculated.tuition_fees_term_3 +
                                  calculated.yr_ben_term_3 +
                                  (calculated.housing_allow_term_3 * calculated.term_length) +
                                  calculated.book_stipend_term_3;
      }
    };


    /*
     * Calculate Total Benefits for Year
     */
    var getTotalYear = function () {
      if (calculated.institution_type == 'ojt') {
        calculated.total_year = 0;
      } else {
        calculated.total_year = calculated.tuition_fees_total +
                                calculated.yr_ben_total +
                                calculated.housing_allow_total +
                                calculated.book_stipend_total;
      }
    };

    // Calculate values
    formatLocation();
    getInstitutionType();
    getInstitutionTypeForDisplay();
    getTier();
    getTuitionFees();
    getHousingAllowance();
    getBookStipend();
    getTuitionOutOfState();
    getNumberOfTerms();
    getTuitionNetPrice();
    getTuitionFeesCap();
    getTuitionFeesPerTerm();
    getTermLength();
    getAcadYearLength();
    getRopBook();
    getRopOjt();
    getKickerBenefit();
    getYellowRibbonEligibility();
    getTerm1();
    getTerm2();
    getTerm3();
    getTerm4();
    getTuitionFeesTerm1();
    getTuitionFeesTerm2();
    getTuitionFeesTerm3();
    getTuitionFeesTotal();
    getYrBenTerm1();
    getYrBenTerm2();
    getYrBenTerm3();
    getYrBenTotal();
    getYrBreakdown();
    getHousingAllowTerm1();
    getHousingAllowTerm2();
    getHousingAllowTerm3();
    getHousingAllowTotal();
    getBookStipendTerm1();
    getBookStipendTerm2();
    getBookStipendTerm3();
    getBookStipendYear();
    getTotalTerm1();
    getTotalTerm2();
    getTotalTerm3();
    getTotalPaidToSchool();
    getTotalLeftToPay();
    getTotalScholarships();
    getTotalPaidToYou();
    getTotalYear();
  };
});



  // All institutions (names and facility codes)
  var institutions = [];

  // User form data
  var formData = {
    cumulative_service:    '',
    military_status:       '',
    spouse_active_duty:    false,
    facility_codes:        [],
    online:                false
  };

  // The current institution
//  var institution = {};
  var selectedInstitutions = [];

  // Calculated values
  var calculated = {
    tier:                     0.0,
    service_discharge:        false,
    institution_type:         '',
    institution_type_display: '',
    location:                 '',
    est_tuition_fees:         0,
    est_housing_allowance:    0,
    est_book_stipend:         0,
    tuition_out_of_state:     0,
    number_of_terms:          0,
    term_length:              0,
    acad_year_length:         0,
    tuition_net_price:        0,
    tuition_fees_cap:         0,
    tuition_fees_per_term:    0,
    rop_book:                 0,
    rop_ojt:                  0,
    kicker_benefit:            0,
    term1:                    '',
    term2:                    '',
    term3:                    '',
    term4:                    '',
    tuition_fees_term_1:      0,
    tuition_fees_term_2:      0,
    tuition_fees_term_3:      0,
    tuition_fees_total:       0,
    yr_ben_term_1:            0,
    yr_ben_term_2:            0,
    yr_ben_term_3:            0,
    yr_ben_total:             0,
    yr_ben_school_term_1:     0,
    yr_ben_school_term_2:     0,
    yr_ben_school_term_3:     0,
    yr_ben_school_total:      0,
    yr_ben_va_term_1:         0,
    yr_ben_va_term_2:         0,
    yr_ben_va_term_3:         0,
    yr_ben_va_total:          0,
    housing_allow_term_1:     0,
    housing_allow_term_2:     0,
    housing_allow_term_3:     0,
    housing_allow_total:      0,
    book_stipend_term_1:      0,
    book_stipend_term_2:      0,
    book_stipend_term_3:      0,
    book_stipend_total:       0,
    total_term_1:             0,
    total_term_2:             0,
    total_term_3:             0,
    total_to_school:          0,
    total_scholarship_ta:     0,
    total_to_you:             0,
    total_left_to_pay:        0,
    total_year:               0,
    yellow_ribbon_elig:       false
  };

  // Constants
  var TFCAP  = 20235.02,
      AVGBAH = 1509,
      BSCAP  = 1000,
      BSOJTMONTH = 83,
      FLTTFCAP   = 11562.86,
      CORRESPONDTFCAP  = 9828.43,
      TUITIONASSISTCAP = 4500,
      GROUP1GRADMED  = 39.4,
      GROUP1GRADHIGH = 57.8,
      GROUP2GRADMED  = 20.2,
      GROUP2GRADHIGH = 36.6,
      GROUP3GRADMED  = 35,
      GROUP3GRADHIGH = 63.9,
      GROUP4GRADMED  = 0,
      GROUP4GRADHIGH = 0,
      GROUP5GRADMED  = 62.4,
      GROUP5GRADHIGH = 77,
      GROUP1GRADRANKHIGH = 636,
      GROUP1GRADRANKMED  = 1269,
      GROUP1GRADRANKMAX  = 1873,
      GROUP2GRADRANKHIGH = 470,
      GROUP2GRADRANKMED  = 931,
      GROUP2GRADRANKMAX  = 1390,
      GROUP3GRADRANKHIGH = 252,
      GROUP3GRADRANKMED  = 498,
      GROUP3GRADRANKMAX  = 740,
      GROUP4GRADRANKHIGH = 0,
      GROUP4GRADRANKMED  = 0,
      GROUP4GRADRANKMAX  = 0,
      GROUP5GRADRANKHIGH = 808,
      GROUP5GRADRANKMED  = 1542,
      GROUP5GRADRANKMAX  = 2263,
      CDRHIGH = 100,
      CDRAVG  = 14.7,
      CDRLOW  = 0,
      GROUP1LOANMED  = 16122,
      GROUP1LOANHIGH = 21286,
      GROUP2LOANMED  = 7042,
      GROUP2LOANHIGH = 13625,
      GROUP3LOANMED  = 6823,
      GROUP3LOANHIGH = 9501,
      GROUP4LOANMED  = 5000,
      GROUP4LOANHIGH = 12167,
      GROUP5LOANMED  = 7321,
      GROUP5LOANHIGH = 9501,
      GROUP1LOANRANKMED  = 709,
      GROUP1LOANRANKHIGH = 1345,
      GROUP1LOANRANKMAX  = 2000,
      GROUP2LOANRANKMED  = 460,
      GROUP2LOANRANKHIGH = 931,
      GROUP2LOANRANKMAX  = 1409,
      GROUP3LOANRANKMED  = 189,
      GROUP3LOANRANKHIGH = 511,
      GROUP3LOANRANKMAX  = 727,
      GROUP4LOANRANKMED  = 0,
      GROUP4LOANRANKHIGH = 0,
      GROUP4LOANRANKMAX  = 0,
      GROUP5LOANRANKMED  = 675,
      GROUP5LOANRANKHIGH = 1349,
      GROUP5LOANRANKMAX  = 2024;

  // Colors and styles
  var lightBlue  = '#94bac9',
      mediumBlue = '#1d7893',
      darkBlue   = '#004974',
      darkGray   = '#494949',
      font       = 'Arial, Helvetica, sans-serif';

  // For analytics
  var didOpenCalculator = false;


  /*
   * Get user data from the form
   */
  var getFormData = function () {
    formData.cumulative_service = $('#cumulative-service').val();
    formData.military_status    = $('#military-status').val();
    formData.spouse_active_duty = $('#spouse-active-duty-yes').prop('checked');
    formData.online             = $('#online-classes-yes').prop('checked');

    if (formData.military_status == 'spouse') {
      $('#spouse-active-duty-form').show();
    } else {
      $('#spouse-active-duty-form').hide();
    }
  };



  /*
   * Get data for selected institution
   */
  var getInstitution = function (i, facility_code, callback) {
    var url = 'api/' + facility_code.substr(0, 3) + '/' + facility_code + '.json';

    $.getJSON(url, function(data) {
      selectedInstitutions[i] = new InstitutionData(data, i);
//      institution = data;
      callback();
    });
  };



  /*
   * Formats currency in USD
   */
  var formatCurrency = function (num) {
    num = Math.round(num);
    var str = num.toString();
    if (str.length > 3) {
      return '$' + str.slice(0, -3) + ',' + str.slice(-3);
    } else {
      return '$' + str;
    }
  };




  /*
   * Update benefit information
   */
  var update = function () {
    // Get user data from the form
    getFormData();

    // An institution must be selected to proceed
    if (!formData.facility_code) { return; }

    var index = formData.index;
    var institution = selectedInstitutions[index] || {};
    var institutionData = institution.data || {};
    if (formData.facility_code == institutionData.facility_code) {
      // Just do an update with existing institution, no $.getJSON call
      updatePage();
    } else {
      // Lookup the new institution
      getInstitution(index, formData.facility_code, function () {
        var institution = selectedInstitutions[index] || {};
        var institutionData = institution.data || {};

        console.log("*** " + institutionData.data + " ***");
        console.log("Institution Data:");
        console.log(institution);

        // Reset values with new institution
        institution.resetHtml();

        // Reset element visibility
        $('#benefit-estimator').show();

        // Reset opening calculator tracking
        didOpenCalculator = false;

        updatePage();
      });
    }
  };


  /*
   * Update the entire page
   */
  var updatePage = function () {
    console.log('--- Updating Page ---');

    // Log values for testing
    console.log("Form Data:");
    console.log(formData);
    console.log("Calculated Values:");
    console.log(calculated);

    // Write results to the page
    $('#benefit-estimator table').removeClass('inactive');

    for (var i = 0; i < selectedInstitutions.length; ++i) {
      if (selectedInstitutions[i]) {
          selectedInstitutions[i].updateHtml(formData);
      }
    }
  };


  /*
   * Update the in/out of state values
   */
  var updateInState = function () {
    if (!formData.in_state) {
      $('#tuition-fees-input').val(formatCurrency(institution.tuition_out_of_state));
    } else {
      $('#tuition-fees-input').val(formatCurrency(institution.tuition_in_state));
    }
  };


  /*
   * Track the opening of the calculator per school
   */
  var trackOpenCalculator = function () {
    if (!didOpenCalculator) {
      track('Calculator', 'Open');
      didOpenCalculator = true;
    }
  };


  // Initialize page

  $(document).ready(function () {

    // Bind event handlers to form elements
    $('#cumulative-service, #military-status, ' +
      '#spouse-active-duty-yes, #spouse-active-duty-no, ' +
      '#online-classes-yes, #online-classes-no, ' +
      '#in-state-yes, #in-state-no, ' +
      '#tuition-fees-input, ' +
      '#in-state-tuition-fees, ' +
      '#yellow-ribbon-recipient-yes, #yellow-ribbon-recipient-no,  ' +
      '#yellow-ribbon-amount, ' +
      '#enrolled, ' +
      '#working, ' +
      '#calendar, ' +
      '#number-non-traditional-terms, ' +
      '#length-non-traditional-terms, ' +
      '#kicker-elig-yes, #kicker-elig-no, ' +
      '#kicker, ' +
      '#scholar, ' +
      '#tuition-assist').on('change', function () {
      GIBComparisonTool.update();
    });

    $('#in-state-yes, #in-state-no').on('change', function () {
      updateInState();
      GIBComparisonTool.update();
    });

    $('#tuition-fees-input, #in-state-tuition-fees,' +
      '#yellow-ribbon-amount, #scholar, #kicker').bindWithDelay('keyup', function(e) {
      $(this).change();
    }, 1000);

    // Hide elements on load
    $('#calculate-benefits-btn').hide();
    $('#spouse-active-duty-form').hide();
    $('#institution-select').hide();
    $('#veteran-indicators').hide();
    $('#voc-rehab').hide();
    $('#school-indicators').hide();

    $('#tuition-fees-section').hide();
    $('#enrollment-section').hide();
    $('#calculator').hide();

    // Load institution data
    $.getJSON('api/institutions.json', function (data) {

      var label = "";
      for (var i = 0; i < data.length; i++) {

        if (data[i][4] == "USA") {
          label = data[i][1] + ' (' + data[i][2] + ', ' + data[i][3] + ')';
        } else {
          label = data[i][1] + ' (' + data[i][2] + ', ' + data[i][4] + ')';
        }

        institutions.push({ value:   data[i][0],
                            label:   label,
                            city:    data[i][2],
                            state:   data[i][3],
                            country: data[i][4] });
      }

      function addAutocomplete(j) {
        $('#institution-search-' + j).autocomplete({
          minLength: 3,
          source: function (request, response) {
            var results = [],
                state = $('#filter-state-' + j).val(),
                institution_type = $('#filter-institution-type-' + j).val();

            // Do filtering stuff
            if ($('#filter-results-box-' + j).is(':visible')) {
              for (var i = 0; i < institutions.length; i++) {
                if (((state == institutions[i].state || state == "") ||
                    (state == 'foreign' && institutions[i].country != 'USA')) &&
                    (institution_type == getInstitutionTypeForSearch(institutions[i].value) || institution_type == "")) {
                  results.push(institutions[i]);
                }
              }
            } else {
              results = institutions;
            }

            results = $.ui.autocomplete.filter(results, request.term);

            if (results == 0) {
              response(["*** No Schools / Employers Found ***"]);
            } else {
              response(results.slice(0, 200));
            }
          },
          select: function (event, ui) {
            event.preventDefault();
            $('#institution-search').val(ui.item.label);
            formData.index = j - 1;
            formData.facility_code = ui.item.value;
            GIBComparisonTool.update();

            // Track when institution is selected
  //          _gaq.push(['_trackEvent', 'School Interactions', 'School Added', formData.facility_code]);
          },
          focus: function (event, ui) {
            event.preventDefault();
            $('#institution-search').val(ui.item.label);
          }
        });
      }
      for (var i = 1; i < 4; ++i) {
        addAutocomplete(i);
      }

    });
  });


  return {
    update: update,
    trackOpenCalculator: trackOpenCalculator
  };

})();


/*
 * Toggle filter results
 */
function toggleFilterResults () {
  $('#filter-results-box-1').toggle();
  $('#filter-results-box-2').toggle();
  $('#filter-results-box-3').toggle();
}


/*
 * Toggle between calculator and benefit estimator
 */
function toggleCalc () {
  $('#benefit-estimator').toggle();
  $('#calculator').toggle();
  $('#calculate-benefits-btn a').html();

  var benStr = "How much am I going to get?";
  var calcStr = "Return to Summary"
  if ($('#calculate-benefits-btn a').html() == benStr) {
    $('#calculate-benefits-btn a').html(calcStr);
    scrollToAnchor('calculator');
  } else {
    $('#calculate-benefits-btn a').html(benStr);
    scrollToAnchor('benefit-estimator');
  }
}



/*
 * Scroll to anchor
 */
function scrollToAnchor (id) {
  var aTag = $("a[name='"+ id +"']");
  $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}


/*
 * Tracks a link using Google Analytics
 */
function track (action, label, url) {
//  _gaq.push(['_trackEvent', 'Page Interactions', action, label]);
}
