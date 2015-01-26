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
    var heent = [
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
            label: "TM",
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
        {
            name: "tm_red_and_bulging",
            label: "TM red and bulging",
            model: "tmRedAndBulging",
            note_toggle: false,
            model_note: "tmRedAndBulgingNote",
            cat: "heent"
        },
        {
            name: "exudates_on_tonsil",
            label: "Exudates on tonsil",
            model: "exudatesOnTonsil",
            note_toggle: false,
            model_note: "exudatesOnTonsilNote",
            cat: "heent"
        },
        {
            name: "cervical_adenopathy",
            label: "Cervical adenopathy",
            model: "cervicalAdenopathy",
            note_toggle: false,
            model_note: "cervicalAdenopathyNote",
            cat: "heent"
        }
    ];

    var resp = [
        {
            name: "good_bilat_a_e",
            label: "Good bilat A/E",
            model: "goodBilatA_E",
            note_toggle_flag: false,
            model_note: "goodBilatAENote",
            cat: "respiratory_exam"
        },
        {
            name: "decrease_a_e",
            label: "Decrease A/E",
            model: "decreaseA_E",
            note_toggle_flag: false,
            model_note: "decreaseAENote",
            cat: "respiratory_exam"
        },
        {
            name: "wheezing",
            label: "Wheezing",
            model: "wheezing",
            note_toggle_flag: false,
            model_note: "wheezingNote",
            cat: "respiratory_exam"
        },
        {
            name: "crackle",
            label: "Crackle",
            model: "crackle",
            note_toggle_flag: false,
            model_note: "crackleNote",
            cat: "respiratory_exam"
        }
    ];

    var abdo = [
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
            name: "fpp_and_equal",
            label: "FPP and equal",
            model: "fppAndEqual",
            note_toggle: false,
            model_note: "fppAndEqualNote",
            cat: "abdominal_exam"
        },
        {
            name: "distended",
            label: "Distended",
            model: "distended",
            note_toggle: false,
            model_note: "distendedNote",
            cat: "abdominal_exam"
        },
        {
            name: "tender",
            label: "Tender",
            model: "tender",
            note_toggle: false,
            model_note: "tenderNote",
            cat: "abdominal_exam"
        },
        {
            name: "decrease_bowel_sounds",
            label: "Decrease bowel sounds",
            model: "decreaseBowelSounds",
            note_toggle: false,
            model_note: "decreaseBowelSoundsNote",
            cat: "abdominal_exam"
        }
    ];

    var cardiov = [
        {
            name: "s1",
            label: "S1",
            model: "s1",
            note_toggle: false,
            model_note: "s1Note",
            cat: "cardio_vascular"
        },
        {
            name: "s2",
            label: "S2",
            model: "s2",
            note_toggle: false,
            model_note: "s2Note",
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
    ];

    var neuro = [
        {
            name: "cnii_x_ii",
            label: "CNII-X II",
            model: "cnii_x_ii",
            note_toggle: false,
            model_note: "cniixiiNote",
            cat: "neurological_exam"
        },
        {
            name: "power",
            label: "Power",
            model: "power",
            note_toggle: false,
            model_note: "powerNote",
            cat: "neurological_exam"
        },
        {
            name: "sensation",
            label: "Sensation",
            model: "sensation",
            note_toggle: false,
            model_note: "sensationNote",
            cat: "neurological_exam"
        },
        {
            name: "tone",
            label: "Tone",
            model: "tone",
            note_toggle: false,
            model_note: "toneNote",
            cat: "neurological_exam"
        },
        {
            name: "cl_exam",
            label: "CL exam",
            model: "clExam",
            note_toggle: false,
            model_note: "clExamNote",
            cat: "neurological_exam"
        }
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
                good_bilat_a_e: {
                    text: 'Normal',
                    index: 2
                },
                good_bilat_a_e_note: '',
                decrease_a_e: {
                    text: 'Abnormal',
                    index: 1
                },
                decrease_a_e_note: '',
                wheezing: {
                    text: 'Abnormal',
                    index: 1
                },
                wheezing_note: '',
                crackle: {
                    text: 'Abnormal',
                    index: 1
                },
                crackle_note: '',
            },
            cardio_vascular: {
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
                ppp_note: ''
            },
            abdominal_exam: {
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
                    text: 'Abnormal',
                    index: 1
                },
                distended_note: '',
                tender: {
                    text: 'Abnormal',
                    index: 1
                },
                tender_note: '',
                decrease_bowel_sounds: {
                    text: 'Abnormal',
                    index: 1
                },
                decrease_bowel_sounds_note: '',
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
                    text: 'Abnormal',
                    index: 1
                },
                tm_red_and_bulging_note: '',
                exudates_on_tonsil: {
                    text: 'Abnormal',
                    index: 1
                },
                exudates_on_tonsil_note: '',
                cervical_adenopathy: {
                    text: 'Abnormal',
                    index: 1
                },
                cervical_adenopathy_note: '',
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
                cl_exam_note: ''
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
