angular.module('starter.factories', [])

.factory('erFormDefault', function(){
    var options = [
      {label: 'not applicable', value: 0},
      {label: 'Abnormal', value: 1},
      {label: 'Normal', value: 2}
    ];
    var heent = [
      {name: "throat_clear", label: "Throat clear", model: "throatClear", note_toggle: false, model_note: ""},
      {name: "tm", label: "TM", model: "tm", note_toggle: false, model_note: "tmNote"},
      {name: "neck_supple", label: "Neck supple", model: "neckSupple", note_toggle: false, model_note: ""},
      {name: "tm_red_and_bulging", label: "TM red and bulging", model: "tmRedAndBulging", note_toggle: false, model_note: ""},
      {name: "exudates_on_tonsil", label: "Exudates on tonsil", model: "exudatesOnTonsil", note_toggle: false, model_note: ""},
      {name: "cervical_adenopathy", label: "Cervical adenopathy", model: "cervicalAdenopathy", note_toggle: false, model_note: ""}
    ];

    var resp = [
      {name: "good_bilat_a_e", label: "Good bilat A/E", model: "goodBilatA_E", note_toggle_flag: false, model_note: ""},
      {name: "decrease_a_e", label: "Decrease A/E", model: "decreaseA_E", note_toggle_flag: false, model_note: ""},
      {name: "wheezing", label: "Wheezing", model: "wheezing", note_toggle_flag: false, model_note: ""},
      {name: "crackle", label: "Crackle", model: "crackle", note_toggle_flag: false, model_note: ""}
    ];

    var abdo = [
      {name: "soft_and_non_tender", label: "Soft and non tender", model: "softAndNonTender", note_toggle: false, model_note: ""},
      {name: "bsp", label: "BSP", model: "bsp", note_toggle: false, model_note: ""},
      {name: "fpp_and_equal", label: "FPP and equal", model: "fppAndEqual", note_toggle: false, model_note: ""},
      {name: "distended", label: "Distended", model: "distended", note_toggle: false, model_note: ""},
      {name: "tender", label: "Tender", model: "tender", note_toggle: false, model_note: ""},
      {name: "decrease_bowel_sounds", label: "Decrease bowel sounds", model: "decreaseBowelSounds", note_toggle: false, model_note: ""}
    ];

    var cardiov = [
      {name: "s1", label: "S1", model: "s1", note_toggle: false, model_note: ""},
      {name: "s2", label: "S2", model: "s2", note_toggle: false, model_note: ""},
      {name: "ppp", label: "PPP", model: "ppp", note_toggle: false, model_note: ""},
    ];

    var neuro = [
      {name: "cnii_x_ii", label: "CNII-X II", model: "cnii_x_ii", note_toggle: false, model_note: ""},
      {name: "power", label: "Power", model: "power", note_toggle: false, model_note: ""},
      {name: "sensation", label: "Sensation", model: "sensation", note_toggle: false, model_note: ""},
      {name: "tone", label: "Tone", model: "tone", note_toggle: false, model_note: ""},
      {name: "cl_exam", label: "CL exam", model: "clExam", note_toggle: false, model_note: ""}
    ];
  var values = {
    _id: null,
    id: '',
    date: '',
    time: '',
    er_card: {
      hpi: '',
      pmhx: '',
      medication: '',
      allergies: '',
      ros: ''
    },
    physical_exam: {
      respiratory_exam: {
        good_bilat_a_e: {text:'Normal',index:2},
        decrease_a_e: {text:'Abnormal',index:1},
        wheezing: {text:'Abnormal',index:1},
        crackle: {text:'Abnormal',index:1}
      },
      cardio_vascular: {
        s1: '',
        s2: '',
        ppp: ''
      },
      abdominal_exam: {
        soft_and_non_tender: {text:'Normal',index:2},
        bsp: {text:'Normal',index:2},
        fpp_and_equal: {text:'Normal',index:2},
        distended: {text:'Abnormal',index:1},
        tender: {text:'Abnormal',index:1},
        decrease_bowel_sounds: {text:'Abnormal',index:1}
      },
      heent: {
        throat_clear: {text:'Normal',index:2},
        tm: {text:'Normal',index:2},
        neck_supple: {text:'Normal',index:2},
        tm_red_and_bulging: {text:'Abnormal',index:1},
        exudates_on_tonsil: {text:'Abnormal',index:1},
        cervical_adenopathy: {text:'Abnormal',index:1}
      },
      neurological_exam: {
        cnii_x_ii: {text:'Normal',index:2},
        power: {text:'Normal',index:2},
        sensation: {text:'Normal',index:2},
        tone: {text:'Normal',index:2},
        cl_exam: {text:'Normal',index:2}
      },
      notes: ''
    },
    diagnosis: '',
    discharge_instruction: ''
  };
  return {
    formDefaultValues : values,
    heent: heent,
    cardio_vascular: cardiov,
    respiratory_exam: resp,
    neurological_exam: neuro,
    abdominal_exam: abdo,
    options: options
  }
})
.factory('cacheFactory', function($rootScope, $localForage){
    var allExForms = [];

    var sync = function(newItem, successCallback){
      $localForage.getItem('ExForms').then(function(getSuccess){
        if (!getSuccess){
          allExForms.push(newItem);
          $localForage.setItem('ExForms', allExForms).then(function(setSuccess){
            if (ionic.Platforms.isWebView()){
              window.plugins.toast.showShortTop('Success: Form is saved.');
            }
          })
        } else {
          allExForms = getSuccess;
          allExForms.push(newItem);
          $localForage.setItem('ExForms', allExForms).then(function(setSuccess){
            if (ionic.Platforms.isWebView()){
              window.plugins.toast.showShortTop('Success: Form is saved.');
            }
            $localForage.getItem('ExForms', function(getSuccess){
            })
          })
        }
      });

      return allExForms = [];
    };
    return {
      getStoreLength: function(){
        return $localForage.length();
      },
      getStoreKeys: function(){
        return $localForage.keys();
      },
      setLocalData: function(data){
        return $localForage.setItem('ExForms', data );
      },
      getLocalData: function(){
        return $localForage.getItem('ExForms');
      },
      clearCachedItem: function(item){
        return $localForage.removeItem(item);
      },
      clearAllCached: function(){
        return $localForage.clear();
      },
      broadcastCacheEvent: function(eventType){
        console.log('broadcasting: '+eventType);
        $rootScope.$broadcast('CacheUpdate:'+eventType)
      }
    };
})
.factory('ERaUtilsFactory', function($rootScope){
  return {
    showToast: function(position, duration, message){
      if (position === 'top') {
        if (duration === 'short'){
          window.plugins.toast.showShortTop(message);
        } else {
          window.plugins.toast.showLongTop(message);
        }
      } else if (position === 'bottom') {
        if (duration === 'short'){
          window.plugins.toast.showShortBottom(message);
        } else {
          window.plugins.toast.showLongBottom(message);
        }
      } else if (position === 'center')
        if (duration === 'short') {
         window.plugins.toast.showShortTop(message);
        } else {
         window.plugins.toast.showLongTop(message);
        }
    },
    broadcastPageEvent: function(eventName){
      console.log('broadcasting: '+eventName);
      $rootScope.$broadcast('PageEvent:'+eventName);
    }
  }
})
;
