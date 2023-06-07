
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
      var PACKAGE_NAME = 'packaging-21.3-pyhd8ed1ab_0.0.data';
      var REMOTE_PACKAGE_BASE = 'packaging-21.3-pyhd8ed1ab_0.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages", "packaging-21.3.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages", "packaging", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":54515,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1300,2145,3320,4700,6034,7138,8542,9931,11027,12237,13366,14552,15683,17002,18307,19525,20588,21673,22825,23854,25051,25965,27196,28212,29160,30314,31549,32520,33741,34919,36363,37585,38868,40017,41195,42335,43268,44452,45691,46807,48082,48738,50146,51174,51952,53143,54337],"sizes":[1300,845,1175,1380,1334,1104,1404,1389,1096,1210,1129,1186,1131,1319,1305,1218,1063,1085,1152,1029,1197,914,1231,1016,948,1154,1235,971,1221,1178,1444,1222,1283,1149,1178,1140,933,1184,1239,1116,1275,656,1408,1028,778,1191,1194,178],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_packaging-21.3-pyhd8ed1ab_0.0.data');
      };
      Module['addRunDependency']('datafile_packaging-21.3-pyhd8ed1ab_0.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/conda-meta/packaging-21.3-pyhd8ed1ab_0.json", "start": 0, "end": 84}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/packaging-21.3.dist-info/direct_url.json", "start": 84, "end": 189}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/packaging/__about__.py", "start": 189, "end": 850}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/packaging/__init__.py", "start": 850, "end": 1347}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/packaging/_manylinux.py", "start": 1347, "end": 12835}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/packaging/_musllinux.py", "start": 12835, "end": 17213}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/packaging/_structures.py", "start": 17213, "end": 18644}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/packaging/markers.py", "start": 18644, "end": 27119}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/packaging/requirements.py", "start": 27119, "end": 31783}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/packaging/specifiers.py", "start": 31783, "end": 61893}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/packaging/tags.py", "start": 61893, "end": 77592}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/packaging/utils.py", "start": 77592, "end": 81792}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/packaging/version.py", "start": 81792, "end": 96457}]});
  })();
