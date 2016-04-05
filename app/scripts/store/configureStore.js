var initialState = undefined;
if (window.location.hostname === 'localhost') {  // if production
initialState = {
  "id": "65d26c5c-aac6-44f9-9ede-9fa6059b1336",
  "availableProviders": [
    {
      "description": "23andMe is a privately held personal genomics and biotechnology company based in Mountain View, California. The company is named for the 23 pairs of chromosomes in a normal human cell.",
      "tokenurl": "https://api.23andme.com/authorize/?redirect_uri=http://localhost:5000/receive_code/&response_type=code&client_id=ca3fe941649f96541961f797e5fb0beb&scope=genomes basic names profile:read",
      "name": "23andMe",
      "redirectUrl": "http://localhost:5000/receive_code/",
      "webpage": "https://www.23andme.com",
      "scope": "genomes basic names profile:read",
      "oauthSupported": true,
      "clientId": "ca3fe941649f96541961f797e5fb0beb",
      "logoUrl": "https://api.23andme.com/res/img/logos/icn_logo.b46b629c0c0a.png"
    },
    {
      "description": "Family Tree DNA is a division of Gene by Gene, a commercial genetic testing company based in Houston, Texas. Family Tree DNA offers analysis of autosomal DNA, Y-DNA, and mitochondrial DNA to individuals for genealogical purposes",
      "tokenurl": "",
      "name": "Family Tree DNA",
      "redirectUrl": "",
      "webpage": "https://www.familytreedna.com/",
      "scope": "",
      "oauthSupported": false,
      "clientId": "",
      "logoUrl": "https://dnaexplained.files.wordpress.com/2013/06/family-tree-dna-logo.jpg?w=584"
    },
    {
      "description": "",
      "tokenurl": "",
      "name": "Ancestry",
      "redirectUrl": "",
      "webpage": "http://dna.ancestry.com/",
      "scope": "",
      "oauthSupported": false,
      "clientId": "",
      "logoUrl": "http://c.mfcreative.com/mars/landing/dna/homepage/ancestrydna-logo.png"
    }
  ],
  "isTraitLoaded": true,
  "traits": [
    {
      "description": "Height is a classical trait that not only scientific evidence but also common knowledge ascribe to genetics. Indeed, many studies have shown that height can be heritable up to 80-90%, which means that genetic prediction algorithms are expected to perform well. When populations share\ngenetic background and environmental factors, average height is frequently characteristic within the group.",
      "logo_url": "",
      "name": "height",
      "title": "\"Height\"",
      "$H": 37
    },
    {
      "description": "Diabetes is a chronic metabolic disease characterized by high blood sugar levels over a prolonged period. Common symptoms include frequent urination, increased thirst and increased hunger. If left untreated, diabetes can cause serious long-term complications like cardiovascular diseases\nstroke, chronic kidney failure, foot ulcers and damage to the eyes. Management of diabetes concentrates on keeping blood sugar levels as close to normal, without causing low blood sugar.",
      "logo_url": "",
      "name": "diabetes",
      "title": "\"Diabetes\"",
      "$H": 38
    },
    {
      "description": "Schizophrenia is a mental disorder characterized by abnormal social behavior and failure to understand reality. Common symptoms include false beliefs, unclear or confused thinking, hearing voices, reduced social engagement and lack of motivation. People with schizophrenia often suffer\nfrom anxiety, major depression or substance abuse. Symptoms typically begin in young adulthood. Schizophrenia is treated with antipsychotic medication along with counseling, job training and social rehabilitation.",
      "logo_url": "",
      "name": "schizophrenia",
      "title": "\"Schizophrenia\"",
      "$H": 39
    }
  ],
  "currentStep": "predictions",
  "analyses": {
    "65d26c5c-aac6-44f9-9ede-9fa6059b1336": {
      "date": 1459784474165,
      "genotypeStep": {
        "step": "info",
        "fileUpload": {
          "genotypeFile": {}
        },
        "cloudUpload": {
          "selectedProviders": {},
          "currentProvider": null
        },
        "uploadState": {
          "state": "FINISHED",
          "progress": 100,
          "error": null,
          "genotypeId": "65d26c5c-aac6-44f9-9ede-9fa6059b1336"
        },
        "data": {
          "chr_stats": {
            "Chr4": {
              "annotations": {
                "AA": 5493,
                "--": 162,
                "CC": 6500,
                "GT": 901,
                "II": 31,
                "CT": 4130,
                "CG": 43,
                "AC": 907,
                "GG": 6275,
                "DI": 1,
                "DD": 7,
                "AT": 35,
                "TT": 5453,
                "AG": 3940
              },
              "num_of_snps": 33878
            },
            "Chr11": {
              "annotations": {
                "AA": 4468,
                "--": 166,
                "CC": 6004,
                "GT": 719,
                "II": 196,
                "CT": 3337,
                "CG": 29,
                "AC": 706,
                "GG": 5853,
                "DI": 2,
                "DD": 64,
                "AT": 23,
                "TT": 4387,
                "AG": 3312
              },
              "num_of_snps": 29266
            },
            "Chr8": {
              "annotations": {
                "AA": 5058,
                "--": 134,
                "CC": 5861,
                "GT": 807,
                "AG": 3413,
                "CT": 3468,
                "CG": 14,
                "AC": 808,
                "GG": 5838,
                "DD": 6,
                "AT": 11,
                "TT": 4804,
                "II": 14
              },
              "num_of_snps": 30236
            },
            "Chr7": {
              "annotations": {
                "AA": 5212,
                "--": 211,
                "CC": 6364,
                "GT": 813,
                "AG": 3649,
                "CT": 3752,
                "CG": 47,
                "AC": 817,
                "GG": 6523,
                "DD": 90,
                "AT": 16,
                "TT": 5317,
                "II": 192
              },
              "num_of_snps": 33003
            },
            "Chr9": {
              "annotations": {
                "AA": 4145,
                "--": 113,
                "CC": 5133,
                "GT": 717,
                "AG": 3124,
                "CT": 3248,
                "CG": 30,
                "AC": 771,
                "GG": 5093,
                "DD": 4,
                "AT": 16,
                "TT": 4160,
                "II": 8
              },
              "num_of_snps": 26562
            },
            "Chr12": {
              "annotations": {
                "AA": 4459,
                "--": 138,
                "CC": 5590,
                "GT": 719,
                "II": 71,
                "CT": 3401,
                "CG": 33,
                "AC": 744,
                "GG": 5503,
                "DI": 1,
                "DD": 30,
                "AT": 17,
                "TT": 4420,
                "AG": 3279
              },
              "num_of_snps": 28405
            },
            "Chr5": {
              "annotations": {
                "AA": 5467,
                "--": 189,
                "CC": 6801,
                "GT": 959,
                "AG": 4010,
                "CT": 3960,
                "CG": 44,
                "AC": 899,
                "GG": 6518,
                "DD": 4,
                "AT": 25,
                "TT": 5466,
                "II": 5
              },
              "num_of_snps": 34347
            },
            "Chr20": {
              "annotations": {
                "AA": 2264,
                "--": 57,
                "CC": 2928,
                "GT": 349,
                "AG": 1701,
                "CT": 1708,
                "CG": 13,
                "AC": 364,
                "GG": 2882,
                "DD": 2,
                "AT": 5,
                "TT": 2200,
                "II": 3
              },
              "num_of_snps": 14476
            },
            "Chr15": {
              "annotations": {
                "AA": 2855,
                "--": 96,
                "CC": 3696,
                "GT": 451,
                "II": 147,
                "CT": 1979,
                "CG": 22,
                "AC": 459,
                "GG": 3511,
                "DI": 1,
                "DD": 60,
                "AT": 12,
                "TT": 2934,
                "AG": 2031
              },
              "num_of_snps": 18254
            },
            "Chr21": {
              "annotations": {
                "AA": 1270,
                "--": 39,
                "CC": 1655,
                "GT": 218,
                "II": 3,
                "CT": 1003,
                "CG": 7,
                "AC": 229,
                "GG": 1683,
                "DI": 1,
                "DD": 5,
                "AT": 1,
                "TT": 1300,
                "AG": 1037
              },
              "num_of_snps": 8451
            },
            "Chr17": {
              "annotations": {
                "AA": 2627,
                "--": 168,
                "CC": 4029,
                "GT": 377,
                "II": 528,
                "CT": 1870,
                "CG": 27,
                "AC": 392,
                "GG": 3787,
                "DI": 1,
                "DD": 209,
                "AT": 16,
                "TT": 2708,
                "AG": 1912
              },
              "num_of_snps": 18651
            },
            "Chr18": {
              "annotations": {
                "GG": 3098,
                "AA": 2714,
                "--": 69,
                "CC": 3099,
                "AT": 4,
                "TT": 2604,
                "AG": 1991,
                "GT": 462,
                "CG": 7,
                "AC": 456,
                "CT": 1970
              },
              "num_of_snps": 16474
            },
            "Chr16": {
              "annotations": {
                "AA": 2812,
                "--": 151,
                "CC": 3956,
                "GT": 558,
                "AG": 2258,
                "CT": 2118,
                "CG": 24,
                "AC": 548,
                "GG": 3934,
                "DD": 34,
                "AT": 9,
                "TT": 2712,
                "II": 63
              },
              "num_of_snps": 19177
            },
            "Chr22": {
              "annotations": {
                "AA": 1306,
                "--": 74,
                "CC": 1932,
                "GT": 179,
                "II": 78,
                "CT": 970,
                "CG": 19,
                "AC": 205,
                "GG": 1996,
                "DI": 1,
                "DD": 29,
                "AT": 6,
                "TT": 1276,
                "AG": 1000
              },
              "num_of_snps": 9071
            },
            "Chr13": {
              "annotations": {
                "AA": 3486,
                "--": 108,
                "CC": 4106,
                "GT": 564,
                "AG": 2439,
                "CT": 2464,
                "CG": 15,
                "AC": 569,
                "GG": 4054,
                "DD": 130,
                "AT": 9,
                "TT": 3365,
                "II": 336
              },
              "num_of_snps": 21645
            },
            "Chr10": {
              "annotations": {
                "AA": 4451,
                "--": 146,
                "CC": 5541,
                "GT": 851,
                "II": 8,
                "CT": 3636,
                "CG": 44,
                "AC": 793,
                "GG": 5644,
                "DI": 1,
                "DD": 5,
                "AT": 20,
                "TT": 4433,
                "AG": 3602
              },
              "num_of_snps": 29175
            },
            "Chr2": {
              "annotations": {
                "AA": 7348,
                "--": 177,
                "CC": 8895,
                "GT": 1203,
                "II": 276,
                "CT": 5332,
                "CG": 34,
                "AC": 1183,
                "GG": 8805,
                "DI": 2,
                "DD": 56,
                "AT": 20,
                "TT": 7422,
                "AG": 5291
              },
              "num_of_snps": 46044
            },
            "Chr14": {
              "annotations": {
                "AA": 2924,
                "--": 93,
                "CC": 3564,
                "GT": 483,
                "AG": 2263,
                "CT": 2168,
                "CG": 19,
                "AC": 557,
                "GG": 3625,
                "DD": 2,
                "AT": 10,
                "TT": 2919,
                "II": 14
              },
              "num_of_snps": 18641
            },
            "Chr3": {
              "annotations": {
                "AA": 6133,
                "--": 163,
                "CC": 7326,
                "GT": 1069,
                "II": 174,
                "CT": 4508,
                "CG": 42,
                "AC": 1092,
                "GG": 7329,
                "DI": 5,
                "DD": 50,
                "AT": 26,
                "TT": 6074,
                "AG": 4465
              },
              "num_of_snps": 38456
            },
            "Chr19": {
              "annotations": {
                "AA": 1671,
                "--": 166,
                "CC": 2941,
                "GT": 297,
                "II": 25,
                "CT": 1347,
                "CG": 25,
                "AC": 301,
                "GG": 3002,
                "DI": 3,
                "DD": 7,
                "AT": 13,
                "TT": 1796,
                "AG": 1336
              },
              "num_of_snps": 12930
            },
            "Chr1": {
              "annotations": {
                "AA": 7219,
                "--": 258,
                "CC": 9596,
                "GT": 1120,
                "II": 130,
                "CT": 4995,
                "CG": 77,
                "AC": 1101,
                "GG": 9654,
                "DI": 3,
                "DD": 34,
                "AT": 46,
                "TT": 7239,
                "AG": 5074
              },
              "num_of_snps": 46546
            },
            "Chr6": {
              "annotations": {
                "AA": 6358,
                "--": 637,
                "CC": 7932,
                "GT": 1017,
                "II": 160,
                "CT": 4261,
                "CG": 132,
                "AC": 948,
                "GG": 7861,
                "DI": 26,
                "DD": 46,
                "AT": 84,
                "TT": 6399,
                "AG": 4507
              },
              "num_of_snps": 40368
            }
          },
          "num_of_snps": 574056
        }
      },
      "imputationStep": {
        "state": {
          "state": "FINISHED",
          "progress": 100,
          "task": "Finished",
          "analysisType": "imputation"
        },
        "data": {
          "imputation": {
            "pred_r2": 0.6976337136944776,
            "chr_stats": {
              "Chr4": 124,
              "Chr11": 101,
              "Chr8": 111,
              "Chr7": 102,
              "Chr9": 84,
              "Chr12": 83,
              "Chr5": 118,
              "Chr20": 39,
              "Chr17": 72,
              "Chr15": 63,
              "Chr19": 70,
              "Chr6": 147,
              "Chr18": 59,
              "Chr16": 73,
              "Chr22": 35,
              "Chr13": 70,
              "Chr10": 107,
              "Chr2": 124,
              "Chr14": 57,
              "Chr3": 114,
              "Chr21": 29,
              "Chr1": 157
            },
            "num_imputed_snps": 1939
          },
          "convert": {
            "total_num_parsed_snps": 514374,
            "chr_stats": {
              "Chr4": {
                "num_parsed_ok": 31723,
                "num_not_found": 2155,
                "num_misunderstood": 0
              },
              "Chr11": {
                "num_parsed_ok": 25268,
                "num_not_found": 3997,
                "num_misunderstood": 1
              },
              "Chr8": {
                "num_parsed_ok": 28526,
                "num_not_found": 1710,
                "num_misunderstood": 0
              },
              "Chr7": {
                "num_parsed_ok": 28695,
                "num_not_found": 4308,
                "num_misunderstood": 0
              },
              "Chr9": {
                "num_parsed_ok": 24830,
                "num_not_found": 1732,
                "num_misunderstood": 0
              },
              "Chr12": {
                "num_parsed_ok": 24928,
                "num_not_found": 3477,
                "num_misunderstood": 0
              },
              "Chr5": {
                "num_parsed_ok": 31469,
                "num_not_found": 2878,
                "num_misunderstood": 0
              },
              "Chr20": {
                "num_parsed_ok": 13480,
                "num_not_found": 996,
                "num_misunderstood": 0
              },
              "Chr17": {
                "num_parsed_ok": 14466,
                "num_not_found": 4185,
                "num_misunderstood": 0
              },
              "Chr15": {
                "num_parsed_ok": 16008,
                "num_not_found": 2246,
                "num_misunderstood": 0
              },
              "Chr19": {
                "num_parsed_ok": 9740,
                "num_not_found": 3190,
                "num_misunderstood": 0
              },
              "Chr6": {
                "num_parsed_ok": 35243,
                "num_not_found": 5125,
                "num_misunderstood": 0
              },
              "Chr18": {
                "num_parsed_ok": 15675,
                "num_not_found": 799,
                "num_misunderstood": 0
              },
              "Chr16": {
                "num_parsed_ok": 16450,
                "num_not_found": 2727,
                "num_misunderstood": 0
              },
              "Chr22": {
                "num_parsed_ok": 7829,
                "num_not_found": 1242,
                "num_misunderstood": 0
              },
              "Chr13": {
                "num_parsed_ok": 19594,
                "num_not_found": 2051,
                "num_misunderstood": 0
              },
              "Chr10": {
                "num_parsed_ok": 27314,
                "num_not_found": 1861,
                "num_misunderstood": 0
              },
              "Chr2": {
                "num_parsed_ok": 42172,
                "num_not_found": 3872,
                "num_misunderstood": 0
              },
              "Chr14": {
                "num_parsed_ok": 17110,
                "num_not_found": 1531,
                "num_misunderstood": 0
              },
              "Chr3": {
                "num_parsed_ok": 35099,
                "num_not_found": 3357,
                "num_misunderstood": 0
              },
              "Chr21": {
                "num_parsed_ok": 7824,
                "num_not_found": 627,
                "num_misunderstood": 0
              },
              "Chr1": {
                "num_parsed_ok": 40931,
                "num_not_found": 5615,
                "num_misunderstood": 0
              }
            }
          }
        },
        "taskId": "72527d2d-2364-45df-9dfd-5f24a265646e"
      },
      "ancestryStep": {
        "state": {
          "state": "FINISHED",
          "progress": 100,
          "task": "Finished",
          "analysisType": "ancestry"
        },
        "data": {
          "is_in_population": true,
          "pop_mean": [
            -0.00681514627372044,
            -0.011053769613785357
          ],
          "population": "EUR",
          "pop_std": [
            0.0005983887559066846,
            0.0011114548063553646
          ],
          "pc2": -0.011741583609568043,
          "ind_lim": [
            4.361225984924139e-8,
            4.73088092794545e-7
          ],
          "pc1": -0.007023981758849863
        },
        "taskId": "d005ebca-581e-43b1-8d96-aa6c580f4bf0"
      },
      "riskPredictionStep": {
        "selectedTraits": {},
        "runningAnalysis": {}
      }
    }
  }
};
}
const createSagaMiddleware = ReduxSaga.default

var store = Redux.createStore(rootReducer,initialState,
    Redux.compose(
        Redux.applyMiddleware(createSagaMiddleware(rootSaga)),
        window.devToolsExtension ? window.devToolsExtension() : f => f));

     