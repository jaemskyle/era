angular.module('starter.factories', [])

.factory('erFormDefault', function () {
    var options = [
        {
            label: 'not applicable',
            value: 0
        },
        {
            label: 'Abnormal',
            value: 1
        },
        {
            label: 'Normal',
            value: 2
        }
    ];
    var heent = {
        cat_name: 'heent',
        fields: [
          {
              name: "throat_clear",
              label: "Throat clear",
              model: "throatClear",
              note_toggle: false,
              model_note: "throatClearNote",
              cat: "heent"
          },
          {
              name: "tm",
              label: "TM normal",
              model: "tm",
              note_toggle: false,
              model_note: "tmNote",
              cat: "heent"
          },
          {
              name: "neck_supple",
              label: "Neck supple",
              model: "neckSupple",
              note_toggle: false,
              model_note: "neckSuppleNote",
              cat: "heent"
          },
          // {
          //     name: "tm_red_and_bulging",
          //     label: "TM red and bulging",
          //     model: "tmRedAndBulging",
          //     note_toggle: false,
          //     model_note: "tmRedAndBulgingNote",
          //     cat: "heent"
          // },
          // {
          //     name: "exudates_on_tonsil",
          //     label: "Exudates on tonsil",
          //     model: "exudatesOnTonsil",
          //     note_toggle: false,
          //     model_note: "exudatesOnTonsilNote",
          //     cat: "heent"
          // },
          // {
          //     name: "cervical_adenopathy",
          //     label: "Cervical adenopathy",
          //     model: "cervicalAdenopathy",
          //     note_toggle: false,
          //     model_note: "cervicalAdenopathyNote",
          //     cat: "heent"
          // }
          ],
        note: {
            name: "heent_note",
            label: "Heent Note",
            model: "heentNote",
            note_toggle: false,
            cat: "heent"
        },
    };

    var resp = {
        cat_name: 'respiratory_exam',
        fields: [
        {
            name: "good_bilat_a_e",
            label: "Good bilat A/E",
            model: "goodBilatA_E",
            note_toggle_flag: false,
            model_note: "goodBilatAENote",
            cat: "respiratory_exam"
        },
        // {
        //     name: "decrease_a_e",
        //     label: "Decrease A/E",
        //     model: "decreaseA_E",
        //     note_toggle_flag: false,
        //     model_note: "decreaseAENote",
        //     cat: "respiratory_exam"
        // },
        {
            name: "wheezing",
            label: "No Wheezing",
            model: "wheezing",
            note_toggle_flag: false,
            model_note: "wheezingNote",
            cat: "respiratory_exam"
        },
        {
            name: "crackle",
            label: "No Crackle",
            model: "crackle",
            note_toggle_flag: false,
            model_note: "crackleNote",
            cat: "respiratory_exam"
        }],
        note: {
            name: "respiratory_exam_note",
            label: "Respiratory Exam",
            model: "respiratoryExamNote",
            note_toggle_flag: false,
            cat: "respiratory_exam"
        }
    };

    var abdo = {
        cat_name: 'abdominal_exam',
        fields: [
        {
            name: "soft_and_non_tender",
            label: "Soft and non tender",
            model: "softAndNonTender",
            note_toggle: false,
            model_note: "softAndNonTenderNote",
            cat: "abdominal_exam"
        },
        {
            name: "bsp",
            label: "BSP",
            model: "bsp",
            note_toggle: false,
            model_note: "bspNote",
            cat: "abdominal_exam"
        },
        {
            name: "mass",
            label: "No mass",
            model: "mass",
            note_toggle: false,
            model_note: "massNote",
            cat: "abdominal_exam"
        },
        {
            name: "organomegaly",
            label: "No organomegaly",
            model: "organomegaly",
            note_toggle: false,
            model_note: "organomegalyNote",
            cat: "abdominal_exam"
        },
        {
            name: "no_sign_of_peritonitis",
            label: "No sign of peritonitis",
            model: "noSignOfPeritonitis",
            note_toggle: false,
            model_note: "noSignOfPeritonitisNote",
            cat: "abdominal_exam"
        },
        {
            name: "fpp_and_equal",
            label: "FPP and equal",
            model: "fppAndEqual",
            note_toggle: false,
            model_note: "fppAndEqualNote",
            cat: "abdominal_exam"
        },
        // {
        //     name: "distended",
        //     label: "Distended",
        //     model: "distended",
        //     note_toggle: false,
        //     model_note: "distendedNote",
        //     cat: "abdominal_exam"
        // },
        // {
        //     name: "tender",
        //     label: "Tender",
        //     model: "tender",
        //     note_toggle: false,
        //     model_note: "tenderNote",
        //     cat: "abdominal_exam"
        // },
        // {
        //     name: "decrease_bowel_sounds",
        //     label: "Decrease bowel sounds",
        //     model: "decreaseBowelSounds",
        //     note_toggle: false,
        //     model_note: "decreaseBowelSoundsNote",
        //     cat: "abdominal_exam"
        // }
        ],
        note: {
            name: "abdominal_exam_note",
            label: "Abdominal Exam Notes",
            model: "abdominalExamNote",
            note_toggle: false,
            cat: "abdominal_exam"
        }
    };

    var cardiov = {
        cat_name: 'cardio_vascular',
        fields: [
          {
              name: "s1_s2_present",
              label: "S1 and S2 present",
              model: "s1S2Present",
              note_toggle: false,
              model_note: "s1S2PresentNote",
              cat: "cardio_vascular"
          },
          {
              name: "s3",
              label: "No S3",
              model: "s3",
              note_toggle: false,
              model_note: "s3Note",
              cat: "cardio_vascular"
          },
          {
              name: "s4",
              label: "No S4",
              model: "s4",
              note_toggle: false,
              model_note: "s4Note",
              cat: "cardio_vascular"
          },
          {
              name: "murmur",
              label: "No murmur",
              model: "murmur",
              note_toggle: false,
              model_note: "murmurNote",
              cat: "cardio_vascular"
          },
          {
              name: "ppp",
              label: "PPP",
              model: "ppp",
              note_toggle: false,
              model_note: "pppNote",
              cat: "cardio_vascular"
          },
          {
              name: "jvd",
              label: "No JVD",
              model: "jvd",
              note_toggle: false,
              model_note: "jvdNote",
              cat: "cardio_vascular"
          }
        ],
        note: {
            name: "cardio_vascular_note",
            label: "Cardio Vascular Note",
            model: "cardioVascularNote",
            note_toggle: false,
            cat: "cardio_vascular"
        }

    };

    var neuro = {
        cat_name: 'neurological_exam',
        fields: [{
            name: "cerebellum_exam",
            label: "Cerebellum Exam Normal",
            model: "cerebellumExam",
            note_toggle: false,
            model_note: "cerebellumExamNormalNote",
            cat: "neurological_exam"
        },
        {
            name: "power",
            label: "Power normal",
            model: "power",
            note_toggle: false,
            model_note: "powerNote",
            cat: "neurological_exam"
        },
        {
            name: "sensation",
            label: "Sensation Normal",
            model: "sensation",
            note_toggle: false,
            model_note: "sensationNote",
            cat: "neurological_exam"
        },
        {
            name: "tone",
            label: "Tone normal",
            model: "tone",
            note_toggle: false,
            model_note: "toneNote",
            cat: "neurological_exam"
        },
        {
            name: "reflex",
            label: "Reflex Normal",
            model: "reflex",
            note_toggle: false,
            model_note: "reflexNote",
            cat: "neurological_exam"
        }],
        note: {
            name: "neurological_exam_note",
            label: "Neurological Exam Note",
            model: "neurologicalExamNote",
            cat: "neurological_exam"
        } 
    };

    var values = {
        _id: null,
        id: '',
        date: '',
        time: '',
        er_card: {
            hpi: '',
            pmhx: 'None',
            medication: 'None',
            allergies: 'None'
        },
        physical_exam: {
            respiratory_exam: {
                status: 2,
                good_bilat_a_e: {
                    text: 'Normal',
                    index: 2
                },
                good_bilat_a_e_note: '',
                decrease_a_e: {
                    text: 'Normal',
                    index: 2
                },
                decrease_a_e_note: '',
                wheezing: {
                    text: 'Normal',
                    index: 2
                },
                wheezing_note: '',
                crackle: {
                    text: 'Normal',
                    index: 2
                },
                crackle_note: '',
                respiratory_exam_note: ''
            },
            cardio_vascular: {
                status: 2,
                s1: {
                    text: 'Normal',
                    index: 2
                },
                s1_note: '',
                s2: {
                    text: 'Normal',
                    index: 2
                },
                s2_note: '',
                ppp: {
                    text: 'Normal',
                    index: 2
                },
                ppp_note: '',
                cardio_vascular_note: ''
            },
            abdominal_exam: {
                status: 2,
                soft_and_non_tender: {
                    text: 'Normal',
                    index: 2
                },
                soft_and_non_tender_note: '',
                bsp: {
                    text: 'Normal',
                    index: 2
                },
                bsp_note: '',
                fpp_and_equal: {
                    text: 'Normal',
                    index: 2
                },
                fpp_and_equal_note: '',
                distended: {
                    text: 'Normal',
                    index: 2
                },
                distended_note: '',
                tender: {
                    text: 'Normal',
                    index: 2
                },
                tender_note: '',
                decrease_bowel_sounds: {
                    text: 'Normal',
                    index: 2
                },
                decrease_bowel_sounds_note: '',
                abdominal_exam_note: ''
            },
            heent: {
                throat_clear: {
                    text: 'Normal',
                    index: 2
                },
                throat_clear_note: '',
                tm: {
                    text: 'Normal',
                    index: 2
                },
                tm_note: '',
                neck_supple: {
                    text: 'Normal',
                    index: 2
                },
                neck_supple_note: '',
                tm_red_and_bulging: {
                    text: 'Normal',
                    index: 2
                },
                tm_red_and_bulging_note: '',
                exudates_on_tonsil: {
                    text: 'Normal',
                    index: 2
                },
                exudates_on_tonsil_note: '',
                cervical_adenopathy: {
                    text: 'Normal',
                    index: 2
                },
                cervical_adenopathy_note: '',
                heent_note: ''
            },
            neurological_exam: {
                cnii_x_ii: {
                    text: 'Normal',
                    index: 2
                },
                cnii_x_ii_note: '',
                power: {
                    text: 'Normal',
                    index: 2
                },
                power_note: '',
                sensation: {
                    text: 'Normal',
                    index: 2
                },
                sensation_note: '',
                tone: {
                    text: 'Normal',
                    index: 2
                },
                tone_note: '',
                cl_exam: {
                    text: 'Normal',
                    index: 2
                },
                cl_exam_note: '',
                neurological_exam_note: ''
            },
            notes: ''
        },
        diagnosis: '',
        discharge_instruction: ''
    };
    return {
        formDefaultValues: values,
        heent: heent,
        cardio_vascular: cardiov,
        respiratory_exam: resp,
        neurological_exam: neuro,
        abdominal_exam: abdo,
        options: options
    }
}).factory('cacheFactory', function ($rootScope, $localForage) {
    return {
        getStoreLength: function () {
            return $localForage.length();
        },
        getStoreKeys: function () {
            return $localForage.keys();
        },
        setLocalData: function (data) {
            return $localForage.setItem('ExForms', data);
        },
        getLocalData: function () {
            return $localForage.getItem('ExForms');
        },
        clearCachedItem: function (item) {
            return $localForage.removeItem(item);
        },
        clearAllCached: function () {
            return $localForage.clear();
        },
        broadcastCacheEvent: function (eventType) {
            console.log('broadcasting: ' + eventType);
            $rootScope.$broadcast('CacheUpdate:' + eventType)
        }
    };
}).factory('ERaUtilsFactory', function ($rootScope, $timeout) {
    return {
        showToast: function (position, duration, message) {
            if (position === 'top') {
                if (duration === 'short') {
                    window.plugins.toast.showShortTop(message);
                } else {
                    window.plugins.toast.showLongTop(message);
                }
            } else if (position === 'bottom') {
                if (duration === 'short') {
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
        broadcastPageEvent: function (eventName) {
            console.log('broadcasting: ' + eventName);
            $timeout(function () {
                $rootScope.$broadcast('PageEvent:' + eventName);
            });
        }
    }
});
