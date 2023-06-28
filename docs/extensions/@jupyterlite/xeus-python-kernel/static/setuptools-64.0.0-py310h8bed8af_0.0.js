
  var Module = typeof globalThis.Module !== 'undefined' ? globalThis.Module : {};

  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }

  Module.expectedDataFileDownloads++;
  (function() {
    // When running as a pthread, FS operations are proxied to the main thread, so we don't need to
    // fetch the .data bundle on the worker
    if (Module['ENVIRONMENT_IS_PTHREAD']) return;
    var loadPackage = function(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'setuptools-64.0.0-py310h8bed8af_0.0.data';
      var REMOTE_PACKAGE_BASE = 'setuptools-64.0.0-py310h8bed8af_0.0.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['empackSetStatus']) Module['empackSetStatus']('Downloading',PACKAGE_NAME,loaded,total);
            if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "tmp", true, true);
Module['FS_createPath']("/tmp", "xeus-python-kernel", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel", "envs", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs", "xeus-python-kernel", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel", "conda-meta", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel", "lib", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib", "python3.10", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10", "site-packages", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages", "pkg_resources", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources", "_vendor", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor", "importlib_resources", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor", "jaraco", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/jaraco", "text", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor", "more_itertools", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor", "packaging", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor", "pyparsing", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing", "diagram", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources", "extern", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":474059,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1371,2630,4093,5342,6623,7953,9128,10159,11354,12540,13835,15156,16187,17469,18607,19852,21037,22274,23410,24512,25882,27288,28573,29604,30668,31606,32909,34186,35398,36466,37542,38768,40022,41113,42340,43652,44845,45990,47253,48494,49756,51006,52005,53302,54483,55661,56761,57867,59197,60468,61690,63054,64471,65994,67181,68529,69751,71106,72419,73695,75083,76398,77279,78445,79546,80783,81687,82922,84222,85252,86613,87714,88872,89963,91143,92339,93467,94806,96113,97136,98478,99764,101082,102362,103685,104939,106116,107235,108749,110234,111331,112448,113611,114721,116085,117300,118300,119516,120569,121923,123360,124449,125539,126794,127918,129168,130492,131889,132995,134208,135518,136763,138067,139348,140170,141389,142747,144009,145354,146646,147928,149225,150531,151743,153112,154364,155250,156165,157241,158580,159560,160875,161886,163161,164483,165803,166964,168045,169325,170434,171811,172962,174256,175526,176745,178055,179076,180297,181585,182939,184073,185325,186477,187734,189121,190259,191526,192650,193992,195321,196573,197899,199299,200603,201809,202846,204157,205480,206794,207606,208822,210200,211423,212617,214025,215402,216378,217579,218828,219950,221152,222499,223772,225001,226097,227193,228383,229306,230507,231323,232566,233506,234385,235554,236799,237751,239005,240105,241587,242839,244166,245260,246424,247626,248552,249767,250997,252231,253396,254119,255498,256548,257355,258560,259782,261410,262852,263918,264988,266268,267592,268795,270158,270855,271799,273012,274017,275379,276636,278228,279497,280579,281769,283070,284300,285523,286749,288034,289188,290578,291775,292946,294116,294851,295556,296796,297687,298935,300253,301621,302949,303923,305179,306390,307671,308343,309490,310401,310849,311915,313067,314240,315251,316435,317667,318861,320074,321189,322198,323326,324623,325716,326991,328098,329038,330254,331308,332532,333781,334768,335583,336586,337995,339104,340247,341286,342175,343322,344667,345865,346946,348014,348947,350078,350892,351869,353063,354055,355128,356300,357420,358537,359659,360691,361924,362816,363868,364916,365973,367208,368292,369689,370792,372203,373349,374437,375700,376952,378289,379399,380688,381797,383093,384202,385175,386415,387622,388914,390009,391236,392523,393855,395223,396613,398046,399347,400679,401994,403110,404270,405576,406781,407684,408711,409962,411254,412168,413400,414745,416111,417421,418528,419933,421227,422585,424013,425353,426666,427714,428734,430064,431378,432628,433900,434674,436016,437036,438411,439670,440920,441873,442819,443969,445132,446266,447407,448577,449752,450490,451534,452869,453799,454855,455799,456608,457769,458685,460036,461054,461743,462498,463316,464537,465680,466847,467985,469251,470487,471776,472908],"sizes":[1371,1259,1463,1249,1281,1330,1175,1031,1195,1186,1295,1321,1031,1282,1138,1245,1185,1237,1136,1102,1370,1406,1285,1031,1064,938,1303,1277,1212,1068,1076,1226,1254,1091,1227,1312,1193,1145,1263,1241,1262,1250,999,1297,1181,1178,1100,1106,1330,1271,1222,1364,1417,1523,1187,1348,1222,1355,1313,1276,1388,1315,881,1166,1101,1237,904,1235,1300,1030,1361,1101,1158,1091,1180,1196,1128,1339,1307,1023,1342,1286,1318,1280,1323,1254,1177,1119,1514,1485,1097,1117,1163,1110,1364,1215,1000,1216,1053,1354,1437,1089,1090,1255,1124,1250,1324,1397,1106,1213,1310,1245,1304,1281,822,1219,1358,1262,1345,1292,1282,1297,1306,1212,1369,1252,886,915,1076,1339,980,1315,1011,1275,1322,1320,1161,1081,1280,1109,1377,1151,1294,1270,1219,1310,1021,1221,1288,1354,1134,1252,1152,1257,1387,1138,1267,1124,1342,1329,1252,1326,1400,1304,1206,1037,1311,1323,1314,812,1216,1378,1223,1194,1408,1377,976,1201,1249,1122,1202,1347,1273,1229,1096,1096,1190,923,1201,816,1243,940,879,1169,1245,952,1254,1100,1482,1252,1327,1094,1164,1202,926,1215,1230,1234,1165,723,1379,1050,807,1205,1222,1628,1442,1066,1070,1280,1324,1203,1363,697,944,1213,1005,1362,1257,1592,1269,1082,1190,1301,1230,1223,1226,1285,1154,1390,1197,1171,1170,735,705,1240,891,1248,1318,1368,1328,974,1256,1211,1281,672,1147,911,448,1066,1152,1173,1011,1184,1232,1194,1213,1115,1009,1128,1297,1093,1275,1107,940,1216,1054,1224,1249,987,815,1003,1409,1109,1143,1039,889,1147,1345,1198,1081,1068,933,1131,814,977,1194,992,1073,1172,1120,1117,1122,1032,1233,892,1052,1048,1057,1235,1084,1397,1103,1411,1146,1088,1263,1252,1337,1110,1289,1109,1296,1109,973,1240,1207,1292,1095,1227,1287,1332,1368,1390,1433,1301,1332,1315,1116,1160,1306,1205,903,1027,1251,1292,914,1232,1345,1366,1310,1107,1405,1294,1358,1428,1340,1313,1048,1020,1330,1314,1250,1272,774,1342,1020,1375,1259,1250,953,946,1150,1163,1134,1141,1170,1175,738,1044,1335,930,1056,944,809,1161,916,1351,1018,689,755,818,1221,1143,1167,1138,1266,1236,1289,1132,1151],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_setuptools-64.0.0-py310h8bed8af_0.0.data');
      };
      Module['addRunDependency']('datafile_setuptools-64.0.0-py310h8bed8af_0.0.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/conda-meta/setuptools-64.0.0-py310h8bed8af_0.json", "start": 0, "end": 90}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/__init__.py", "start": 90, "end": 108658}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/__init__.py", "start": 108658, "end": 108658}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/appdirs.py", "start": 108658, "end": 133359}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/__init__.py", "start": 133359, "end": 133865}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/_adapters.py", "start": 133865, "end": 138369}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/_common.py", "start": 138369, "end": 141110}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/_compat.py", "start": 141110, "end": 143816}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/_itertools.py", "start": 143816, "end": 144700}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/_legacy.py", "start": 144700, "end": 148194}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/abc.py", "start": 148194, "end": 152080}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/readers.py", "start": 152080, "end": 155646}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/importlib_resources/simple.py", "start": 155646, "end": 158482}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/jaraco/__init__.py", "start": 158482, "end": 158482}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/jaraco/context.py", "start": 158482, "end": 163902}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/jaraco/functools.py", "start": 163902, "end": 177417}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/jaraco/text/__init__.py", "start": 177417, "end": 192943}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/more_itertools/__init__.py", "start": 192943, "end": 193026}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/more_itertools/more.py", "start": 193026, "end": 325595}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/more_itertools/recipes.py", "start": 325595, "end": 344005}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/__about__.py", "start": 344005, "end": 344666}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/__init__.py", "start": 344666, "end": 345163}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/_manylinux.py", "start": 345163, "end": 356651}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/_musllinux.py", "start": 356651, "end": 361029}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/_structures.py", "start": 361029, "end": 362460}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/markers.py", "start": 362460, "end": 370956}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/requirements.py", "start": 370956, "end": 375662}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/specifiers.py", "start": 375662, "end": 405772}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/tags.py", "start": 405772, "end": 421471}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/utils.py", "start": 421471, "end": 425671}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/packaging/version.py", "start": 425671, "end": 440336}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/__init__.py", "start": 440336, "end": 449495}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/actions.py", "start": 449495, "end": 455921}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/common.py", "start": 455921, "end": 468857}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/core.py", "start": 468857, "end": 682167}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/diagram/__init__.py", "start": 682167, "end": 705835}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/exceptions.py", "start": 705835, "end": 714858}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/helpers.py", "start": 714858, "end": 753987}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/results.py", "start": 753987, "end": 779328}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/testing.py", "start": 779328, "end": 792730}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/unicode.py", "start": 792730, "end": 803517}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/pyparsing/util.py", "start": 803517, "end": 810322}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/_vendor/zipp.py", "start": 810322, "end": 818747}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/pkg_resources/extern/__init__.py", "start": 818747, "end": 821173}]});
  })();
