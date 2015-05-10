(function(window, document, undefined) {
  'use strict';

  window.Site = {};

  Site.ask = {

    // Initialize ask components.
    init: function() {
      var self = this;

      self.events();
    },

    // Cache ask DOM elements.
    elems: {
      ask_input: document.querySelector('#ask-input'),
      clear_input: document.querySelector('#clear-input'),
      suggest_container: document.querySelector('#suggestion-container')
    },

    // @todo
    // Rename map.
    map: {
      'Question': 'answer'
    },

    // Register events.
    events: function() {
      var self = this;

      self.elems.ask_input.onblur = self.blur.bind(this);
      self.elems.ask_input.onfocus = self.focus.bind(this);
      self.elems.ask_input.onkeyup = self.keyup.bind(this);
      self.elems.ask_input.onkeydown = self.keydown.bind(this);

      self.elems.clear_input.onclick = self.clear_input.bind(this);
    },

    blur: function(e) {
      var self = this;

      // DEBUG.
      console.log('blur');

      if (!self.checkValid()) {
        self.elems.clear_input.style.opacity = 0;
      }
    },

    // Function to run on ask input focus.
    focus: function(e) {
      var self = this;

      // DEBUG.
      console.log('focus');

      if (self.checkValid()) {
        self.elems.clear_input.style.opacity = 1;
      }
    },

    // Function to run on ask input keyup.
    keyup: function(e) {
      var self = this,
          param = self.elems.ask_input.value.trim();

      if (self.checkValid()) {
        console.log('valid');
        self.suggest(param);
        self.elems.clear_input.style.opacity = 1;
      } else {
        console.log('invalid');
        self.elems.clear_input.style.opacity = 0;
      }
    },

    // Function to run on ask input keydown.
    keydown: function(e) {
      var self = this,
        param = self.elems.ask_input.value.trim();

      if (e.which === 13) {
        self.ask(param);
      }
    },

    checkValid: function() {
      var self = this,
        valid = false;

      if (self.elems.ask_input.value.trim().length > 0) {
        valid = true;
      }

      return valid;
    },

    ask: function(param) {
      var self = this;

      if (self.checkValid()) {

        // DEBUG.
        console.log('ask');
        console.log('ask param: ' + param);


      } else {

        // DEBUG.
        console.log('Nothing to ask');
      }
    },

    suggest: function(param) {
      var self = this;

      param = new RegExp('^' + param, 'gi');

      // DEBUG.
      console.log('Suggest');
      console.log('Suggest param: ' + param);

      for (var prop in self.map) {
        if (param.test(prop)) {
          // DEBUG.
          console.log('Match: ' + prop);
          console.log('Match url: ' + self.map[prop]);
        }
      }
    },

    clear_input: function() {
      var self = this;

      self.elems.ask_input.value = '';
      self.elems.clear_input.style.opacity = 0;
      self.elems.ask_input.focus();

      return false;
    }
  };

  Site.placeholder = {

    init: function() {
      var self = this;

      self.type_hints();
    },

    elems: {
      placeholder: document.querySelector('#placeholder')
    },

    hints: [
      'Ask me anything...',
      'Say something'
    ],

    clear: function(callback) {
      var self = this,
        counter = self.elems.placeholder.innerHTML.length,
        timer;

      function loop() {
        if (counter !== 0) {
          self.elems.placeholder.innerHTML = self.elems.placeholder.innerHTML.slice(0, -1);
          counter--;
        } else {
          clearTimeout(timer);
          callback();
          return false;
        }

        timer = setTimeout(loop, 100);
      }

      loop();
    },

    type: function(word, callback) {
      var self = this,
          word_split = word.split(''),
          counter = 0,
          timer;

      function loop() {
        if (counter < word_split.length) {
          self.elems.placeholder.innerHTML += word_split[counter];
          counter++;
        } else {
          callback();
          clearTimeout(timer);
          return false;
        }

        timer = setTimeout(loop, 100);
      }

      if (self.elems.placeholder.innerHTML.length > 0) {
        self.clear(loop);
      } else {
        loop();
      }
    },

    type_hints: function() {
      var self = this,
          counter = 0,
          timer;

      self.typing = true;

      function loop() {
        if (self.typing) {
          self.type(self.hints[counter]);

          // No idea what this does.
          if (counter === self.hints.length - 1) {
            counter = 0;
          } else {
            counter++;
          }
        }

        timer = setTimeout(loop, 10000);
      }

      loop();
    }
  };

  Site.ask.init();
  Site.placeholder.init();

})(window, window.document);

/*

// Age Calc
// ageCalc.js

// Scripts to calculate ageCalc.

var ageCalc = {
  calc: function(dob) {
    var self = this;
    self.today = new Date();
    self.birthDate = new Date(dob);
    self.age = self.today.getFullYear() - self.birthDate.getFullYear();
    self.m = self.today.getMonth() - self.birthDate.getMonth();

    if(self.m < 0 || (self.m === 0 && self.today.getDate() < self.birthDate.getDate())) {
      self.age--;
    };

    return self.age;
  }
};

// Writes age in page
document.getElementById('age').innerHTML = ageCalc.calc('1997/10/22');

// Loader
// loader.js

// Scripts for the loading animation.

var loader = {
  init: function() {
    var self = this;
    self.progress_speed = 20;
    self.loading_bar = document.getElementById('loading-bar');
    self.loading();
  },

  loading: function() {
    var self = this;
    self.width = 0;
    document.getElementById('main').style.display = 'none';
    for(var i = 0; i <= 100; i++) {
      setTimeout(function() {
        self.loading_bar.style.width = self.width + '%';
        self.width++;
      }, i * self.progress_speed);
    };
    setTimeout(function() {
      self.loaded();
    }, 100 * self.progress_speed);
  },

  loaded: function() {
    var self = this;
    self.margin = 0;
    document.getElementById('main').style.display = 'block';
    for(var i = 0; i <= 50; i++) {
      setTimeout(function() {
        document.getElementById('container').style.marginLeft = self.margin * -1 +'vw';
        self.margin++;
      }, i * self.progress_speed);
    };
  }
};

loader.init();

*/
