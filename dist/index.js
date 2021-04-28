"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageConvert = void 0;
var imageConvert = function (files, correctWidth, correctHeight, format) {
    if (correctWidth === void 0) { correctWidth = 500; }
    if (correctHeight === void 0) { correctHeight = 500; }
    if (format === void 0) { format = "image/webp"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var getCanvasesBlob, promises, _loop_1, i, newImages, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    getCanvasesBlob = function (canvases) {
                        var promises = [];
                        canvases.forEach(function (canvas) {
                            promises.push(new Promise(function (resolve, reject) {
                                canvas.toBlob(function (blob) {
                                    if (blob !== null) {
                                        resolve(blob);
                                    }
                                    reject(new Error("Blob with error"));
                                }, format);
                            }));
                        });
                        return Promise.all(promises);
                    };
                    promises = [];
                    _loop_1 = function (i) {
                        var tempFile = files.item(i);
                        if (tempFile !== null) {
                            // Create a promise for process an image
                            var imgPromise = new Promise(function (resolve, reject) {
                                var tempImg = new Image(); // Img should be created to read file
                                tempImg.src = URL.createObjectURL(tempFile); // Convert file to URL
                                tempImg.onload = function () {
                                    var imageWidth = tempImg.width; // Actual image width
                                    var imageHeight = tempImg.height; // Actual image height
                                    var width = correctWidth / imageWidth; // Scale width coefficient
                                    var height = correctHeight / imageHeight; // Scale height coefficient
                                    var tempCanvas = document.createElement("canvas"); // Create a canvas
                                    tempCanvas.width = correctWidth; // Initialaize canvas width
                                    tempCanvas.height = correctHeight; // Initialaize canvas height
                                    // Init drow parameters
                                    var cropX = 0;
                                    var cropY = 0;
                                    var cropedWidth = 0;
                                    var cropedHeight = 0;
                                    // Getting 2D context from canvas
                                    var can = tempCanvas.getContext("2d");
                                    // Check image ratio
                                    if (imageWidth > imageHeight) {
                                        var originalCoef = imageWidth / imageHeight; // Original ratio coefficient
                                        // Check image ratio from new sizes
                                        if (correctWidth > correctHeight) {
                                            var cropCoef = correctWidth / correctHeight; // New ratio coefficient
                                            if (originalCoef < cropCoef) {
                                                cropedWidth = Math.floor(imageWidth);
                                                cropedHeight = Math.floor(cropedWidth / cropCoef);
                                                cropX = Math.floor((imageWidth - cropedWidth) / 2); // Always 0
                                                cropY = Math.floor((imageHeight - cropedHeight) / 2);
                                            }
                                            else if (originalCoef > cropCoef) {
                                                cropedWidth = Math.floor(imageHeight * cropCoef);
                                                cropedHeight = Math.floor(imageHeight);
                                                cropX = Math.floor((imageWidth - cropedWidth) / 2);
                                                cropY = Math.floor((imageHeight - cropedHeight) / 2); // Always 0
                                            }
                                        }
                                        else if (correctWidth < correctHeight) {
                                            var cropCoef = correctHeight / correctWidth;
                                            if (originalCoef < cropCoef) {
                                                cropedWidth = Math.floor(imageHeight / cropCoef);
                                                cropedHeight = Math.floor(imageHeight);
                                                cropX = Math.floor((imageWidth - cropedWidth) / 2);
                                                cropY = Math.floor((imageHeight - cropedHeight) / 2); // Always 0
                                            }
                                            else if (originalCoef > cropCoef) {
                                                cropedWidth = Math.floor(imageHeight / cropCoef);
                                                cropedHeight = Math.floor(imageHeight);
                                                cropX = Math.floor((imageWidth - cropedWidth) / 2);
                                                cropY = Math.floor((imageHeight - cropedHeight) / 2); // Always 0
                                            }
                                        }
                                        else {
                                            cropedWidth = imageHeight;
                                            cropedHeight = imageHeight;
                                            cropX = Math.floor((imageWidth - cropedWidth) / 2);
                                            cropY = Math.floor((imageHeight - cropedHeight) / 2);
                                        }
                                        can.drawImage(tempImg, cropX, cropY, cropedWidth, cropedHeight, 0, 0, correctWidth, correctHeight);
                                    }
                                    else if (imageWidth < imageHeight) {
                                        var originalCoef = imageHeight / imageWidth; // Original ratio coefficient
                                        if (correctWidth > correctHeight) {
                                            var cropCoef = correctWidth / correctHeight; // New ratio coefficient
                                            if (originalCoef < cropCoef) {
                                                cropedWidth = Math.floor(imageWidth);
                                                cropedHeight = Math.floor(imageWidth / cropCoef);
                                                cropX = Math.floor((imageWidth - cropedWidth) / 2);
                                                cropY = Math.floor((imageHeight - cropedHeight) / 2);
                                            }
                                            else if (originalCoef > cropCoef) {
                                                cropedWidth = Math.floor(imageWidth);
                                                cropedHeight = Math.floor(imageWidth / cropCoef);
                                                cropX = Math.floor((imageWidth - cropedWidth) / 2);
                                                cropY = Math.floor((imageHeight - cropedHeight) / 2);
                                            }
                                        }
                                        else if (correctWidth < correctHeight) {
                                            var cropCoef = correctHeight / correctWidth; // New ratio coefficient
                                            if (originalCoef < cropCoef) {
                                                cropedWidth = Math.floor(imageHeight / cropCoef);
                                                cropedHeight = Math.floor(imageHeight);
                                                cropX = Math.floor((imageWidth - cropedWidth) / 2);
                                                cropY = Math.floor((imageHeight - cropedHeight) / 2);
                                            }
                                            else if (originalCoef > cropCoef) {
                                                cropedWidth = Math.floor(imageWidth);
                                                cropedHeight = Math.floor(imageWidth * cropCoef);
                                                cropX = Math.floor((imageWidth - cropedWidth) / 2);
                                                cropY = Math.floor((imageHeight - cropedHeight) / 2);
                                            }
                                        }
                                        else {
                                            cropedWidth = imageWidth;
                                            cropedHeight = imageWidth;
                                            cropX = Math.floor((imageWidth - cropedWidth) / 2);
                                            cropY = Math.floor((imageHeight - cropedHeight) / 2);
                                        }
                                        can.drawImage(tempImg, cropX, cropY, cropedWidth, cropedHeight, 0, 0, correctWidth, correctHeight);
                                    }
                                    else if (imageWidth === imageHeight) {
                                        can.drawImage(tempImg, 0, 0, correctWidth, correctHeight);
                                    }
                                    can.scale(width, height); // Scale canvas image by context
                                    resolve(tempCanvas);
                                };
                                tempImg.onerror = function () { return reject(new Error("Image load error")); };
                            });
                            promises.push(imgPromise); // Add promise to array
                        }
                    };
                    for (i = 0; i < files.length; i++) {
                        _loop_1(i);
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all(promises)
                            .then(function (canvases) { return getCanvasesBlob(canvases); }) // Converting to blob with format
                            .then(function (blobs) {
                            var fileArray = []; // Temp array for make list of images (FileList emulator but not readonly)
                            for (var i = 0; i < blobs.length; i++) {
                                var type = format.substring(format.indexOf("/") + 1);
                                var file = new File([blobs[i]], "image_" + i + "." + type, { type: format });
                                fileArray.push(file);
                            }
                            return fileArray;
                        })];
                case 2:
                    newImages = _b.sent();
                    return [2 /*return*/, newImages];
                case 3:
                    _a = _b.sent();
                    throw new Error("Something wrong with files");
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.imageConvert = imageConvert;