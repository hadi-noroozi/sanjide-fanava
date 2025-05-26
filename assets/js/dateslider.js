(function (root, factory) {
    if (typeof define === "function" && define.amd) {
      define(factory);
    } else {
      root.DateSlider = factory();
    }
  })(window, function () {
    "use strict";
  
    var ariaPrefix = "aria";
    var beforeend = "beforeend";
    var culture = document.documentElement.lang || "en";
    var dateSliderPrefix = "date-slider";
    var day = "day";
    var pixel = "px";
    var role = "role";
    var selectedWord = "selected";
    var transitionDuration = "transitionDuration";
  
    var ariaSelected = ariaAttribute(selectedWord);
    var ariaHidden = ariaAttribute("hidden");
    var dateSliderDay = dateSliderAttribute(day);
    var dateSliderSelected = dateSliderAttribute(selectedWord);
    var selectedAttributes = [dateSliderSelected, ariaSelected];
  
    /*
     * Default configuration constants.
     */
    var configuration = {
      day: 86400000,
      dayFormatter: new Intl.DateTimeFormat(culture, { weekday: "short" }),
      monthFormatter: new Intl.DateTimeFormat(culture, { month: "long" })
    };
  
    /**
     * HTML where a given day is displayed.
     */
    var cardTemplate =
      "<button " +
      dateSliderDay +
      dateSliderSelected +
      ariaHidden +
      ariaSelected +
      role +
      "='option' class='" +
      dateSliderDay +
      "' style='width: " +
      pixel +
      "'>" +
      "<span>name</span>" +
      "<p>number</p>" +
      "</button>";
  
    /**
     * Default properties of the date slider object.
     */
    var dateSliderConfiguration = {
      cardOutisde: NaN,
      cardSize: NaN,
      container: undefined,
      firstDay: NaN,
      index: 0,
      isClick: false,
      month: undefined,
      totalCards: 0,
      touchStart: NaN,
      touchNow: NaN,
      x: 0
    };
  
    /**
     * Events and properties that must be registered to make the Date Slider work.
     */
    var dateSliderSetters = {
      getAttribute: {
        function: fillAttribute,
        values: ["border", "cards", "margin"]
      },
      querySelector: {
        function: fillElement,
        values: ["daysContainer", "daysWrapper", "month", "next", "prev"]
      },
      keyDown: {
        element: "daysContainer",
        function: event,
        parameters: onKeyDown,
        values: ["keydown"]
      },
      mouseclick: {
        element: "daysContainer",
        function: event,
        parameters: onClick,
        values: ["click"]
      },
      next: {
        element: "next",
        function: event,
        parameters: onNext,
        values: ["click"]
      },
      previous: {
        element: "prev",
        function: event,
        parameters: onPrevious,
        values: ["click"]
      },
      touchStart: {
        element: "daysContainer",
        function: event,
        parameters: onTouchStart,
        values: ["mousedown", "touchstart"]
      },
      touchMove: {
        element: "daysContainer",
        function: event,
        parameters: onTouchMove,
        values: ["mousemove", "touchmove"]
      },
      touchEnd: {
        element: "daysContainer",
        function: event,
        parameters: onTouchEnd,
        values: ["mouseup", "mouseleave", "touchend"]
      }
    };
  
    var DateSlider = function (container) {
      var _ = this;
      var key = undefined;
      var setter = undefined;
      var today = Date.parse(new Date());
  
      _.config = Object.assign({}, dateSliderConfiguration);
      _.config.container = container;
      _.firstDay = today;
      _.latestDay = today;
  
      for (key in dateSliderSetters) {
        setter = dateSliderSetters[key];
  
        if (setter.parameters) {
          setter.values.forEach(
            setter.function.bind(_, setter.parameters, setter.element)
          );
        } else {
          setter.values.forEach(setter.function.bind(_));
        }
      }
  
      requestAnimationFrame(pleaseSetTheDate.bind(undefined, _));
    };
  
    /**
     * public
     * cardTotalSize: returns the size of the card including the margin.
     */
    DateSlider.prototype.cardTotalSize = function () {
      return this.config.cardSize + this.config.cardOutside;
    };
  
    /**
     * public
     * createDayCard: returns the HTML as string that represents a card with a date in the date slider.
     *
     * @param {object} card object containing the date information that is going to be displayed in the card.
     */
    DateSlider.prototype.createDayCard = function (card) {
      var _ = this;
  
      _.latestDay += configuration.day;
      _.config.totalCards += 1;
  
      return replaceTemplate(card, cardTemplate);
    };
  
    /**
     * public
     * createDayObject: returns an object with the information needed to generated the card HTML.
     *
     * @param {boolean} isHidden true if the card is not visible when added to the DOM, otherwise false.
     */
    DateSlider.prototype.createDayObject = function (isHidden) {
      var _ = this;
      var currentDay = new Date(_.latestDay);
      var card = {
        aria: {
          selected: false,
          hidden: isHidden
        },
        name: configuration.dayFormatter
          .format(currentDay)
          .toUpperCase()
          .replace(".", ""),
        number: currentDay.getDate(),
        px: _.config.cardSize + pixel
      };
  
      card[dateSliderPrefix] = {
        day: Date.parse(currentDay),
        selected: false
      };
  
      return card;
    };
  
    /**
     * public
     * isScrolling: returns true if a touchStart event has been triggered, otherwise false.
     */
    DateSlider.prototype.isScrolling = function () {
      return this.config.touchStart || this.config.touchStart === 0;
    };
  
    /**
     * public
     * setDay: sets the day from the given milliseconds as selected.
     *
     * @param {number} any date represented as milliseconds that will be used to populate the title.
     */
    DateSlider.prototype.setDay = function (milliseconds) {
      var _ = this;
      var previousSelectedElement = undefined;
      var selectedElement = undefined;
  
      previousSelectedElement = searchElement(_, selectedWord + "='true'");
      selectedElement = searchElement(_, day + "='" + milliseconds + "'");
      selectedAttributes.forEach(
        bindAttribute.bind(previousSelectedElement, false)
      );
      selectedAttributes.forEach(bindAttribute.bind(selectedElement, true));
    };
  
    /**
     * public
     * setMonth: sets the month from the give date as title in the HTML.
     *
     * @param {date} date any date that will be used to populate the title.
     */
    DateSlider.prototype.setMonth = function (date) {
      var _ = this;
      var month = undefined;
  
      date = date || _.latestDay;
      month = configuration.monthFormatter.format(date);
      _.config.month = month;
      _.month.innerHTML = month;
    };
  
    /**
     * public
     * translate: moves the daysContainer in X axis the amount of pixels indicated.
     *
     * @param {number} translation amount of pixels to move the container in X axis.
     */
    DateSlider.prototype.translate = function (translation) {
      var _ = this;
      var third = _.config.cardSize / 3;
  
      _.config.x += translation;
      _.daysContainer.style["transform"] =
        "translateX(" + _.config.x + pixel + ")";
  
      if (Math.abs(_.config.x) > third) {
        _.prev.removeAttribute("disabled");
      } else {
        _.prev.setAttribute("disabled", "true");
      }
  
      tomorrowNeverKnows(_);
    };
  
    /**
     * public
     * updateMonth: sets the month name according to the object index.
     *
     * @param {object} _ instance that is being updated.
     */
    DateSlider.prototype.updateMonth = function () {
      var _ = this;
      var indexDate = _.firstDay + configuration.day * _.config.index;
  
      if (configuration.monthFormatter.format(indexDate) !== _.config.month) {
        _.setMonth(indexDate);
      }
    };
  
    /**
     * private
     * ariaAttribute: returns the name of an attribute with the aria prefix;
     *
     * @param {string} word name of the attribute.
     */
    function ariaAttribute(word) {
      return ariaPrefix + "-" + word;
    }
  
    /**
     * private
     * bindAttribute: sets the value of the given attribute in the DOM element.
     *
     * @param {any} value value to be set for the attribute.
     * @param {string} attribute name of the attribute.
     */
    function bindAttribute(value, attribute) {
      var _ = this;
  
      if (!_) {
        return;
      }
  
      _.setAttribute(attribute, value);
    }
  
    /**
     * private
     * dateSliderAttribute: returns the name of an attribute with the date-slider prefix;
     *
     * @param {string} word name of the attribute.
     */
    function dateSliderAttribute(word) {
      return dateSliderPrefix + "-" + word;
    }
  
    /**
     * private
     * event: adds an event listener to the give eventName point to the given handler.
     *
     * @param {function} handler function to be executed when the event is triggered.
     * @param {string} element name of the property that references the node element that will trigger the event.
     * @param {string} eventName name of the event to be add to the current node element.
     */
    function event(handler, element, eventName) {
      this[element].addEventListener(eventName, handler.bind(this), false);
    }
  
    /**
     * private
     * fillAttribute: creates a property on the caller with the attribute from the given DOM node.
     *
     * @param {string} attribute name of the attribute without the date-slider prefix.
     */
    function fillAttribute(attribute) {
      this[attribute] = +this.config.container.getAttribute(
        dateSliderAttribute(attribute)
      );
    }
  
    /**
     * private
     * fillElement: creates a property on the caller with the DOM node that matches the given role.
     *
     * @param {string} element name of the role.
     */
    function fillElement(element) {
      this[element] = searchElement(this, role + "='" + element + "'");
    }
  
    /**
     * private
     * haveANiceDay: shining like a diamond, rolling with the dice.
     *
     * @param {object} _ instance where the amount of cards configured are going to be added as days.
     * @param {boolean} isHidden true if the card is not visible when append to the DOM, otherwise false.
     */
    function haveANiceDay(_, isHidden) {
      var card = undefined;
      var daysHtml = "";
      var x = undefined;
  
      for (x = 0; x < _.cards; x += 1) {
        card = _.createDayObject(isHidden);
        daysHtml += _.createDayCard(card);
      }
  
      _.daysContainer.insertAdjacentHTML(beforeend, daysHtml);
    }
  
    /**
     * private
     * movementX: returns the clientX coordinate of the mouse or touch event.
     *
     * @param {event} event with the information of the mouse or touch event.
     */
    function movementX(event) {
      return event.changedTouches
        ? event.changedTouches[0].clientX
        : event.clientX;
    }
  
    /**
     * private
     * onClick: handler of the click or touch events.
     *
     * @param {event} event with the information of the mouse or touch event.
     */
    function onClick(event) {
      var _ = this;
      var filter = undefined;
      var target = undefined;
  
      if (!_.config.isClick) {
        return;
      }
  
      filter = "[" + dateSliderDay + "]";
  
      for (
        target = event.target;
        target && target != _.config.container;
        target = target.parentNode
      ) {
        if (target.matches(filter)) {
          _.setDay(target.getAttribute(dateSliderDay));
          break;
        }
      }
    }
  
    /**
     * private
     * onKeyDown: handler of the key press event.
     *
     * @param {event} event with the key press information.
     */
    function onKeyDown(event) {
      var _ = this;
      var indexDate = undefined;
      var indexDay = undefined;
  
      if (!event.target.tagName.match("TEXTAREA|INPUT|SELECT")) {
        if (event.keyCode === 37) {
          onPrevious.call(_);
        } else if (event.keyCode === 39) {
          onNext.call(_);
        } else if (event.keyCode === 13) {
          indexDate = _.firstDay + configuration.day * _.config.index;
          indexDay = +searchElement(_, day + "='" + indexDate + "'").getAttribute(
            dateSliderDay
          );
          _.setDay(indexDay);
        }
      }
    }
  
    /**
     * private
     * onNext: handler of the next button click .
     */
    function onNext() {
      var _ = this;
      var cardSize = _.cardTotalSize();
      var difference = Math.abs(_.config.x) - _.config.index * cardSize;
      var indexDate = _.firstDay + configuration.day * _.config.index;
      var indexDay = +searchElement(_, day + "='" + indexDate + "'").getAttribute(
        dateSliderDay
      );
      var milliseconds = undefined;
      var move = cardSize * -1;
      var selectedDay = +searchElement(_, selectedWord + "='true'").getAttribute(
        dateSliderDay
      );
  
      if (difference) {
        difference = (cardSize - difference) * -1;
  
        if (Math.abs(difference) > cardSize) {
          difference += cardSize;
        }
      }
  
      if (indexDay > selectedDay) {
        milliseconds = indexDay + configuration.day;
      } else {
        milliseconds = selectedDay + configuration.day;
      }
      _.config.index += 1;
      _.translate(difference || move);
      _.updateMonth();
      _.setDay(milliseconds);
    }
  
    /**
     * private
     * onPrevious: handler of the previous button click.
     */
    function onPrevious() {
      var _ = this;
      var cardSize = _.cardTotalSize();
      var difference = Math.abs(_.config.x) - _.config.index * cardSize;
      var indexDate = _.firstDay + configuration.day * _.config.index;
      var indexDay = +searchElement(_, day + "='" + indexDate + "'").getAttribute(
        dateSliderDay
      );
      var milliseconds = undefined;
      var move = cardSize;
      var selectedDay = +searchElement(_, selectedWord + "='true'").getAttribute(
        dateSliderDay
      );
  
      if (difference) {
        difference = cardSize + difference;
  
        if (Math.abs(difference) > cardSize) {
          difference -= cardSize;
        }
      }
  
      if (indexDay > selectedDay) {
        milliseconds = indexDay - configuration.day;
      } else {
        milliseconds = selectedDay - configuration.day;
      }
      _.config.index -= 1;
      _.translate(difference || move);
      _.updateMonth();
      _.setDay(milliseconds);
    }
  
    /**
     * private
     * onTouchEnd: handler of mouse up and touch end events.
     *
     * @param {event} event with the information of the mouse or touch event.
     */
    function onTouchEnd(event) {
      var _ = this;
      var totalMovement = Math.abs(movementX(event) - _.config.touchStart);
  
      _.config.isClick = totalMovement < 10;
  
      if (!_.isScrolling()) {
        return;
      }
  
      _.config.touchNow = null;
      _.config.touchStart = null;
  
      if (_.config.x > 0) {
        _.daysContainer.style[transitionDuration] = "0.7s";
        _.translate(-_.config.x);
        return;
      }
  
      _.config.index = Math.abs(Math.round(_.config.x / _.cardTotalSize()));
  
      setHidden(_);
    }
  
    /**
     * private
     * onTouchMove: handler of mouse and touch move events.
     *
     * @param {event} event with the information of the mouse or touch event.
     */
    function onTouchMove(event) {
      var _ = this;
      var clientX = undefined;
      var translation = undefined;
  
      event.preventDefault();
  
      if (!_.isScrolling()) {
        return;
      }
  
      clientX = movementX(event);
      translation = clientX - _.config.touchNow;
  
      _.config.touchNow = clientX;
      _.config.index = Math.abs(Math.round(_.config.x / _.cardTotalSize())) || 0;
      _.translate(translation);
      _.updateMonth();
    }
  
    /**
     * private
     * onTouchStart: handler of mouse down and touch start events.
     *
     * @param {event} event
     */
    function onTouchStart(event) {
      var _ = this;
      var clientX = movementX(event);
  
      _.daysContainer.style[transitionDuration] = "";
      _.config.touchStart = clientX;
      _.config.touchNow = clientX;
      _.config.isClick = true;
    }
  
    /**
     * private
     * pleaseSetTheDate: well, don't say tomorrow 'cause tomorrow is too far away.
     *
     * @param {object} _ instance setting the date.
     */
    function pleaseSetTheDate(_) {
      var width = _.daysWrapper.offsetWidth;
  
      _.config.cardOutside = _.margin + _.border;
      _.config.cardSize = width / _.cards - _.config.cardOutside;
  
      haveANiceDay(_, false);
      haveANiceDay(_, true);
      _.setMonth(_.firstDay);
      _.setDay(_.firstDay);
    }
  
    /**
     * private
     * replaceTemplate: function to replace the configurable values from the cardTemplate.
     *
     * @param {object} obj values to be replaced in the template.
     * @param {string} template template to be replaced.
     * @param {string} prefix nested properties refers to their parents as a prefix.
     */
    function replaceTemplate(obj, template, prefix) {
      var attribute = undefined;
      var key = undefined;
      var value = undefined;
  
      prefix = prefix || "";
  
      for (key in obj) {
        if (typeof obj[key] === "object") {
          template = replaceTemplate(obj[key], template, key + "-");
        } else {
          attribute = prefix + key;
          value = prefix ? attribute + "='" + obj[key] + "'" : obj[key];
          template = template.replace(attribute, value);
        }
      }
  
      return template;
    }
  
    /**
     * private
     * searchAllElements: searches all the DOM nodes that belongs to the given instance and matches the given query.
     *
     * @param {object} instance where the search is going to be executed.
     * @param {string} query filter the elements by a given criteria.
     */
    function searchAllElements(instance, query) {
      var filter = dateSliderAttribute(query);
      return instance.config.container.querySelectorAll("[" + filter + "]");
    }
  
    /**
     * private
     * searchElement: search for the first DOM nodes that belongs to the given instance and matches the given query.
     *
     * @param {object} instance where the search is going to be executed.
     * @param {string} query filter the elements by a given criteria.
     */
    function searchElement(instance, query) {
      var filter = dateSliderAttribute(query);
      return instance.config.container.querySelector("[" + filter + "]");
    }
  
    /**
     * private
     * setHidden: updates the aria-hidden attribute to reflect what is visible on the screen.
     *
     * @param {object} _ instance where the aria-hidden attribute is going to be updated.
     */
    function setHidden(_) {
      var cards = [].slice.call(searchAllElements(_, day));
      var isHidden = undefined;
      var lastVisibleCard = _.config.index + _.cards;
      var x = undefined;
  
      for (x = 0; x < _.config.totalCards; x += 1) {
        isHidden = x < _.config.index || x >= lastVisibleCard;
        cards[x].setAttribute(ariaHidden, isHidden);
      }
    }
  
    /**
     * private
     * tomorrowNeverKnows: turn off your mind, relax and float down stream.
     *
     * @param {object} _ instance where the new days are going to be added.
     */
    function tomorrowNeverKnows(_) {
      var availableCards = _.config.totalCards - _.config.index * 2;
      var card = undefined;
  
      if (availableCards < _.cards) {
        card = _.createDayObject(true);
        _.daysContainer.insertAdjacentHTML(beforeend, _.createDayCard(card));
      }
    }
  
    return DateSlider;
  });
  
  var secondContainer = document.querySelector("#test5");
  
  new DateSlider(secondContainer);
  