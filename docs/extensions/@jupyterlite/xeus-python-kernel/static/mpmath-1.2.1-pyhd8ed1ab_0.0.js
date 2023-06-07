
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
      var PACKAGE_NAME = 'mpmath-1.2.1-pyhd8ed1ab_0.0.data';
      var REMOTE_PACKAGE_BASE = 'mpmath-1.2.1-pyhd8ed1ab_0.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages", "mpmath-1.2.1.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages", "mpmath", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath", "calculus", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath", "functions", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath", "libmp", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath", "matrices", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":878203,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1341,2607,3850,5086,6410,7821,9328,10770,11938,13200,14582,15886,17220,18578,19924,21309,22634,23989,25401,26822,28346,29855,31140,32531,33852,34901,35966,37359,38396,39225,40055,41460,42658,44050,45408,46875,48050,49198,50059,51263,52754,54086,55399,56624,57884,59101,60222,61432,62649,63640,64963,66169,67531,68989,70459,71839,73065,74378,75677,76989,78416,79655,81085,82483,83490,84861,86276,87556,88813,90007,91401,92923,94335,95707,97026,98057,99149,100320,101527,102784,104056,105263,106691,108046,109494,110847,112209,113383,114633,115834,117020,118344,119649,120922,122162,123300,124462,125738,126898,128420,129743,131159,132524,133806,135154,136345,137555,138753,139672,141013,142318,143569,144753,145794,146809,148015,149104,150271,151239,152389,153441,154852,155813,156926,158156,159049,160015,160882,161961,162796,163781,164770,166213,167298,168230,168793,169697,170505,171383,172373,173190,174579,175635,176848,178010,179147,180283,181289,182461,183502,184646,185630,186855,187760,188800,189960,191124,192366,193216,194094,195097,195849,197093,198046,198479,199273,200417,201458,202343,203464,204429,205441,206571,207583,208754,210300,211724,212995,214232,215591,217026,218415,219794,220976,222116,223249,224504,225761,226760,227927,229042,230402,231418,232688,234212,235646,236824,238115,239437,240831,242255,243675,245157,246663,248044,249479,251037,252253,253683,255062,256175,257662,258998,260532,262029,263500,264993,266486,267600,269123,270570,271991,273617,275021,276344,277770,279098,280511,281891,283236,284642,286027,287374,288572,289857,291350,292627,293949,295394,296651,297934,299349,300853,302288,303702,305064,306475,307936,309276,310675,312149,313134,314654,315947,317236,318431,319731,321092,322547,323961,325533,327032,328505,329656,330973,332389,333858,335360,336926,338363,339922,341361,342770,344197,345709,347017,348462,349497,350741,352140,353523,354840,356264,357562,358677,360102,361550,362836,364250,365716,367063,368544,369854,371165,372528,373950,375391,376909,378327,379682,381194,382676,383912,385259,386584,387901,389353,390698,391956,393251,394647,395716,396943,398103,399318,400411,401477,402292,403499,404572,405620,406620,407641,408844,410019,411360,412528,413913,415191,416358,417696,419138,420212,421027,422089,423322,424594,425879,426986,428202,429494,430825,432033,433268,434528,435842,437247,438576,439801,441134,442198,443221,444500,445539,446756,447856,448810,449966,451196,452471,453365,454200,455433,456597,457596,458818,460087,461383,462660,463834,464865,465769,466812,467798,468941,470317,471561,473049,474249,475185,476376,477553,478760,479749,481028,482072,483315,484372,485466,486697,487676,488648,489993,491322,492573,493857,494927,496135,497122,498195,499257,500599,502008,503161,504591,505843,507134,508494,509562,510997,512219,513542,514881,515982,516902,517706,518680,519994,521351,522759,524085,525117,526300,527562,528777,529923,531217,532434,533272,534169,535036,535793,536713,537724,538676,539680,540519,541483,542362,543326,544154,545174,545957,546891,547510,548110,549392,550448,552000,553521,554759,555926,557082,558058,559066,560352,561652,562775,563865,565177,566551,567838,569226,570638,571893,572958,574334,575110,576494,577777,579052,580367,581818,582948,584124,585268,586407,587566,588818,590208,591572,592846,593890,595226,596639,598081,599185,600261,601651,602882,604145,605552,606739,608046,609322,610515,611662,613001,614484,616002,617483,618601,619978,621269,622680,624066,625545,626890,628119,629276,630690,631947,633212,634542,635766,636891,638021,638934,640247,641480,642560,643727,644621,645876,646943,648047,649088,650452,651367,652654,653692,654925,656129,657513,658959,660346,661343,662744,664050,665183,666624,667806,669108,670433,671675,672702,673867,675025,676264,677422,678492,679561,680530,681800,682830,683809,684601,685591,686753,688141,689155,690239,691307,692411,693547,694757,695750,697119,698407,699728,700955,702227,703568,704767,706121,707455,708710,710152,711369,712625,713517,714504,715665,716737,717974,719267,720102,720900,722268,723339,724358,725438,726855,727985,729370,730407,731456,732634,733632,734921,736046,737364,738398,739305,740454,741556,742712,743837,745013,746195,747557,748823,750141,751380,752576,753459,754239,755256,756118,757288,758449,759594,760813,761733,762743,763695,764879,766095,767015,767916,769116,770320,771761,772842,774002,775646,777105,778250,779417,780412,781498,782538,783633,784556,785758,786785,788055,789196,790485,791803,792891,794173,795321,796721,797914,799139,800332,801345,802457,803766,804923,806104,807159,808460,809602,810854,812137,813442,814732,815769,816841,818079,819405,820180,821143,822123,823381,824742,825531,826453,827447,828562,829751,830975,832144,833350,834735,836075,837216,838431,839667,840868,842125,843280,844451,845697,846944,847907,848813,850002,851302,852542,853859,855194,856319,857387,858360,859397,860393,861385,862289,863324,864283,865553,866807,868105,868698,869522,870876,872306,873469,874612,876079,877457],"sizes":[1341,1266,1243,1236,1324,1411,1507,1442,1168,1262,1382,1304,1334,1358,1346,1385,1325,1355,1412,1421,1524,1509,1285,1391,1321,1049,1065,1393,1037,829,830,1405,1198,1392,1358,1467,1175,1148,861,1204,1491,1332,1313,1225,1260,1217,1121,1210,1217,991,1323,1206,1362,1458,1470,1380,1226,1313,1299,1312,1427,1239,1430,1398,1007,1371,1415,1280,1257,1194,1394,1522,1412,1372,1319,1031,1092,1171,1207,1257,1272,1207,1428,1355,1448,1353,1362,1174,1250,1201,1186,1324,1305,1273,1240,1138,1162,1276,1160,1522,1323,1416,1365,1282,1348,1191,1210,1198,919,1341,1305,1251,1184,1041,1015,1206,1089,1167,968,1150,1052,1411,961,1113,1230,893,966,867,1079,835,985,989,1443,1085,932,563,904,808,878,990,817,1389,1056,1213,1162,1137,1136,1006,1172,1041,1144,984,1225,905,1040,1160,1164,1242,850,878,1003,752,1244,953,433,794,1144,1041,885,1121,965,1012,1130,1012,1171,1546,1424,1271,1237,1359,1435,1389,1379,1182,1140,1133,1255,1257,999,1167,1115,1360,1016,1270,1524,1434,1178,1291,1322,1394,1424,1420,1482,1506,1381,1435,1558,1216,1430,1379,1113,1487,1336,1534,1497,1471,1493,1493,1114,1523,1447,1421,1626,1404,1323,1426,1328,1413,1380,1345,1406,1385,1347,1198,1285,1493,1277,1322,1445,1257,1283,1415,1504,1435,1414,1362,1411,1461,1340,1399,1474,985,1520,1293,1289,1195,1300,1361,1455,1414,1572,1499,1473,1151,1317,1416,1469,1502,1566,1437,1559,1439,1409,1427,1512,1308,1445,1035,1244,1399,1383,1317,1424,1298,1115,1425,1448,1286,1414,1466,1347,1481,1310,1311,1363,1422,1441,1518,1418,1355,1512,1482,1236,1347,1325,1317,1452,1345,1258,1295,1396,1069,1227,1160,1215,1093,1066,815,1207,1073,1048,1000,1021,1203,1175,1341,1168,1385,1278,1167,1338,1442,1074,815,1062,1233,1272,1285,1107,1216,1292,1331,1208,1235,1260,1314,1405,1329,1225,1333,1064,1023,1279,1039,1217,1100,954,1156,1230,1275,894,835,1233,1164,999,1222,1269,1296,1277,1174,1031,904,1043,986,1143,1376,1244,1488,1200,936,1191,1177,1207,989,1279,1044,1243,1057,1094,1231,979,972,1345,1329,1251,1284,1070,1208,987,1073,1062,1342,1409,1153,1430,1252,1291,1360,1068,1435,1222,1323,1339,1101,920,804,974,1314,1357,1408,1326,1032,1183,1262,1215,1146,1294,1217,838,897,867,757,920,1011,952,1004,839,964,879,964,828,1020,783,934,619,600,1282,1056,1552,1521,1238,1167,1156,976,1008,1286,1300,1123,1090,1312,1374,1287,1388,1412,1255,1065,1376,776,1384,1283,1275,1315,1451,1130,1176,1144,1139,1159,1252,1390,1364,1274,1044,1336,1413,1442,1104,1076,1390,1231,1263,1407,1187,1307,1276,1193,1147,1339,1483,1518,1481,1118,1377,1291,1411,1386,1479,1345,1229,1157,1414,1257,1265,1330,1224,1125,1130,913,1313,1233,1080,1167,894,1255,1067,1104,1041,1364,915,1287,1038,1233,1204,1384,1446,1387,997,1401,1306,1133,1441,1182,1302,1325,1242,1027,1165,1158,1239,1158,1070,1069,969,1270,1030,979,792,990,1162,1388,1014,1084,1068,1104,1136,1210,993,1369,1288,1321,1227,1272,1341,1199,1354,1334,1255,1442,1217,1256,892,987,1161,1072,1237,1293,835,798,1368,1071,1019,1080,1417,1130,1385,1037,1049,1178,998,1289,1125,1318,1034,907,1149,1102,1156,1125,1176,1182,1362,1266,1318,1239,1196,883,780,1017,862,1170,1161,1145,1219,920,1010,952,1184,1216,920,901,1200,1204,1441,1081,1160,1644,1459,1145,1167,995,1086,1040,1095,923,1202,1027,1270,1141,1289,1318,1088,1282,1148,1400,1193,1225,1193,1013,1112,1309,1157,1181,1055,1301,1142,1252,1283,1305,1290,1037,1072,1238,1326,775,963,980,1258,1361,789,922,994,1115,1189,1224,1169,1206,1385,1340,1141,1215,1236,1201,1257,1155,1171,1246,1247,963,906,1189,1300,1240,1317,1335,1125,1068,973,1037,996,992,904,1035,959,1270,1254,1298,593,824,1354,1430,1163,1143,1467,1378,746],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_mpmath-1.2.1-pyhd8ed1ab_0.0.data');
      };
      Module['addRunDependency']('datafile_mpmath-1.2.1-pyhd8ed1ab_0.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/conda-meta/mpmath-1.2.1-pyhd8ed1ab_0.json", "start": 0, "end": 82}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath-1.2.1.dist-info/direct_url.json", "start": 82, "end": 184}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/__init__.py", "start": 184, "end": 8797}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/calculus/__init__.py", "start": 8797, "end": 8959}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/calculus/approximation.py", "start": 8959, "end": 17776}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/calculus/calculus.py", "start": 17776, "end": 17888}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/calculus/differentiation.py", "start": 17888, "end": 38114}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/calculus/extrapolation.py", "start": 38114, "end": 111409}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/calculus/inverselaplace.py", "start": 111409, "end": 142544}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/calculus/odes.py", "start": 142544, "end": 152452}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/calculus/optimization.py", "start": 152452, "end": 185308}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/calculus/polynomials.py", "start": 185308, "end": 193185}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/calculus/quadrature.py", "start": 193185, "end": 231672}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/ctx_base.py", "start": 231672, "end": 247657}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/ctx_fp.py", "start": 247657, "end": 254229}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/ctx_iv.py", "start": 254229, "end": 271440}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/ctx_mp.py", "start": 271440, "end": 320888}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/ctx_mp_python.py", "start": 320888, "end": 358618}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/function_docs.py", "start": 358618, "end": 639136}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/functions/__init__.py", "start": 639136, "end": 639444}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/functions/bessel.py", "start": 639444, "end": 677382}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/functions/elliptic.py", "start": 677382, "end": 719681}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/functions/expintegrals.py", "start": 719681, "end": 731325}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/functions/factorials.py", "start": 731325, "end": 736598}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/functions/functions.py", "start": 736598, "end": 754698}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/functions/hypergeometric.py", "start": 754698, "end": 806268}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/functions/orthogonal.py", "start": 806268, "end": 822365}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/functions/qfunctions.py", "start": 822365, "end": 829998}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/functions/rszeta.py", "start": 829998, "end": 876182}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/functions/theta.py", "start": 876182, "end": 913502}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/functions/zeta.py", "start": 913502, "end": 949891}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/functions/zetazeros.py", "start": 949891, "end": 980749}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/identification.py", "start": 980749, "end": 1010002}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/libmp/__init__.py", "start": 1010002, "end": 1013792}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/libmp/backend.py", "start": 1013792, "end": 1017152}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/libmp/gammazeta.py", "start": 1017152, "end": 1088610}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/libmp/libelefun.py", "start": 1088610, "end": 1132471}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/libmp/libhyper.py", "start": 1132471, "end": 1169095}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/libmp/libintmath.py", "start": 1169095, "end": 1185783}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/libmp/libmpc.py", "start": 1185783, "end": 1212658}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/libmp/libmpf.py", "start": 1212658, "end": 1257680}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/libmp/libmpi.py", "start": 1257680, "end": 1285302}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/math2.py", "start": 1285302, "end": 1303863}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/matrices/__init__.py", "start": 1303863, "end": 1303957}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/matrices/calculus.py", "start": 1303957, "end": 1322566}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/matrices/eigen.py", "start": 1322566, "end": 1346960}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/matrices/eigen_symmetric.py", "start": 1346960, "end": 1405494}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/matrices/linalg.py", "start": 1405494, "end": 1432456}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/matrices/matrices.py", "start": 1432456, "end": 1464624}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/rational.py", "start": 1464624, "end": 1470600}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/usertools.py", "start": 1470600, "end": 1473629}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/mpmath/visualization.py", "start": 1473629, "end": 1484256}]});
  })();
