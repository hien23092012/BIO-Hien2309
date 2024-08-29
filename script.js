var audio = new Audio('./music.mp3');

audio.oncanplaythrough = function () {
    audio.play();
}

audio.loop = true;

audio.onended = function () {
    audio.play();
}

document.addEventListener('DOMContentLoaded', function () {
    showOverlay();
    showPopup();
});

function showOverlay() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
}

function hideOverlay() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

function showPopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'block';
}

function closePopup() {
    hideOverlay();
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
}

var stop, staticx;
var img = new Image();
img.src = "https://cdn.discordapp.com/attachments/1087345928719061012/1187612115171811328/R9XUjfF.png?ex=659784f9&is=65850ff9&hm=4bb9909933635be0ba6edaaec4cec595029a4acf898b72969690b559c4c95598&";

			function Sakura(x, y, s, r, fn) {
				this.x = x;
				this.y = y;
				this.s = s;
				this.r = r;
				this.fn = fn;
			}

			Sakura.prototype.draw = function(cxt) {
				cxt.save();
				var xc = 40 * this.s / 4;
				cxt.translate(this.x, this.y);
				cxt.rotate(this.r);
				cxt.drawImage(img, 0, 0, 40 * this.s, 40 * this.s)
				cxt.restore();
			}

			Sakura.prototype.update = function() {
				this.x = this.fn.x(this.x, this.y);
				this.y = this.fn.y(this.y, this.y);
				this.r = this.fn.r(this.r);
				if(this.x > window.innerWidth ||
					this.x < 0 ||
					this.y > window.innerHeight ||
					this.y < 0
				) {
					this.r = getRandom('fnr');
					if(Math.random() > 0.4) {
						this.x = getRandom('x');
						this.y = 0;
						this.s = getRandom('s');
						this.r = getRandom('r');
					} else {
						this.x = window.innerWidth;
						this.y = getRandom('y');
						this.s = getRandom('s');
						this.r = getRandom('r');
					}
				}
			}

			SakuraList = function() {
				this.list = [];
			}
			SakuraList.prototype.push = function(sakura) {
				this.list.push(sakura);
			}
			SakuraList.prototype.update = function() {
				for(var i = 0, len = this.list.length; i < len; i++) {
					this.list[i].update();
				}
			}
			SakuraList.prototype.draw = function(cxt) {
				for(var i = 0, len = this.list.length; i < len; i++) {
					this.list[i].draw(cxt);
				}
			}
			SakuraList.prototype.get = function(i) {
				return this.list[i];
			}
			SakuraList.prototype.size = function() {
				return this.list.length;
			}

			function getRandom(option) {
				var ret, random;
				switch(option) {
					case 'x':
						ret = Math.random() * window.innerWidth;
						break;
					case 'y':
						ret = Math.random() * window.innerHeight;
						break;
					case 's':
						ret = Math.random();
						break;
					case 'r':
						ret = Math.random() * 5;
						break;
					case 'fnx':
						random = -0.5 + Math.random() * 1;
						ret = function(x, y) {
							return x + 0.5 * random - 1;
						};
						break;
					case 'fny':
						random = 0.5 + Math.random() * 0.5
						ret = function(x, y) {
							return y + random;
						};
						break;
					case 'fnr':
						random = Math.random() * 0.01;
						ret = function(r) {
							return r + random;
						};
						break;
				}
				return ret;
			}

			function startSakura() {

				requestAnimationFrame = window.requestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					window.oRequestAnimationFrame;
				var canvas = document.createElement('canvas'),
					cxt;
				staticx = true;
				canvas.height = window.innerHeight;
				canvas.width = window.innerWidth;
				canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;');
				canvas.setAttribute('id', 'canvas_sakura');
				document.getElementsByTagName('body')[0].appendChild(canvas);
				cxt = canvas.getContext('2d');
				var sakuraList = new SakuraList();
				for(var i = 0; i < 50; i++) {
					var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny;
					randomX = getRandom('x');
					randomY = getRandom('y');
					randomR = getRandom('r');
					randomS = getRandom('s');
					randomFnx = getRandom('fnx');
					randomFny = getRandom('fny');
					randomFnR = getRandom('fnr');
					sakura = new Sakura(randomX, randomY, randomS, randomR, {
						x: randomFnx,
						y: randomFny,
						r: randomFnR
					});
					sakura.draw(cxt);
					sakuraList.push(sakura);
				}
				stop = requestAnimationFrame(function() {
					cxt.clearRect(0, 0, canvas.width, canvas.height);
					sakuraList.update();
					sakuraList.draw(cxt);
					stop = requestAnimationFrame(arguments.callee);
				})
			}

			window.onresize = function() {
				var canvasSnow = document.getElementById('canvas_snow');
				canvasSnow.width = window.innerWidth;
				canvasSnow.height = window.innerHeight;
			}

			img.onload = function() {
				startSakura();
			}

			function stopp() {
				if(staticx) {
					var child = document.getElementById("canvas_sakura");
					child.parentNode.removeChild(child);
					window.cancelAnimationFrame(stop);
					staticx = false;
				} else {
					startSakura();
				}
			}

// script.js
document.addEventListener('DOMContentLoaded', function () {
	// Danh sách các đoạn văn bản
	var textArray = [
	  'Cuộc sống vốn không công bằng, hãy tập quen dần với điều đó.<br>- Bill Gates -',
	  'Tôi đã thi trượt một số môn, nhưng bạn tôi thì đã qua tất cả. Bây giờ anh ta là một kỹ sư trong Microsoft còn tôi là chủ sở hữu của Microsoft.<br>- Bill Gates -',
	  'Nếu bạn sinh ra trong nghèo khó, đó không phải là lỗi của bạn. Nhưng nếu bạn chết trong nghèo khó, thì đó là lỗi của bạn.<br>- Bill Gates -',
	  'Giá trị của sự cần mẫn nằm ở chỗ nó tích tụ mầm mống cho những điều may mắn. Càng chăm chỉ bao nhiêu, tôi càng được may mắn bấy nhiêu.<br>- Bill Gates -',
	  'Cuộc sống không được chia thành những học kỳ. Bạn cũng chẳng có mùa hè để nghỉ ngơi và rất ít ông chủ nào quan tâm và giúp bạn tìm ra cơ hội này.<br>- Bill Gates -',
	  'Trường học – có thể không có người thắng kẻ thua nhưng ở trường đời thì không phải vậy. Trong một số trường học, người ta có thể loại các điểm kém và cho bạn thêm cơ hội để giành được điểm cao hơn. Trong cuộc sống thực không bao giờ có chuyện như thế.<br>- Bill Gates -',
	  'Sự khác biệt giữa người thành công và người không thành công là người thành công học từ những sai lầm của mình và không lặp lại chúng.<br>- Jeff Bezos -',
	  'Thách thức lớn nhất là không phải đối mặt với người khác; đó là đối mặt với bản thân mình và kiểm soát bản thân mình.<br>- Elon Musk -',
	  'Không có gì là không thể. Tôi tin rằng nếu bạn có đủ kiên nhẫn và đủ tự tin, bạn có thể làm bất cứ điều gì.<br>- Mark Zuckerberg -',
	  'Thành công không phải là chìa khóa mở cửa cho hạnh phúc. Hạnh phúc là chìa khóa mở cửa cho thành công. Nếu bạn yêu những gì bạn đang làm, bạn sẽ thành công.<br>- Albert Schweitzer -',
	];
  
	// Lấy thẻ p bằng ID
	var dynamicText = document.getElementById('dynamicText');
  
	// Chọn một đoạn văn bản ngẫu nhiên
	var randomText = textArray[Math.floor(Math.random() * textArray.length)];
  
	// Đặt nội dung cho thẻ p
	dynamicText.innerHTML = randomText;
  });
  
// Kiểm tra xem trình duyệt có hỗ trợ API vị trí không
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        // Lấy thông tin vị trí
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Gửi yêu cầu API để lấy thông tin địa lý chi tiết
        var apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=fb7f7b0b0d344289a7b91ef578df44e1`;
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Lấy thông tin nước và châu lục từ kết quả API
                var country = data.results[0].components.country;
                var continent = data.results[0].components.continent;

                // Hiển thị thông tin vị trí
                var locationInfo = document.getElementById("locationInfo");
                locationInfo.innerHTML = `<p><i class="fa-solid fa-location-dot"></i> Your Location: ${country}, ${continent}</p>`;
            })
            .catch(error => {
                console.error('Error fetching location data:', error);
            });
    });
} else {
    // Hiển thị thông báo nếu trình duyệt không hỗ trợ API vị trí
    var locationInfo = document.getElementById("locationInfo");
    locationInfo.innerHTML = "<p>Trình Duyệt Không Hỗ Trợ API Vị Trí</p>";
}

// Gửi yêu cầu API để lấy thông tin vị trí từ địa chỉ IP
fetch('http://ipinfo.io/json')  // Sử dụng HTTP thay vì HTTPS
    .then(response => response.json())
    .then(data => {
        // Lấy địa chỉ IP từ dữ liệu
        var ipAddress = data.ip;

        // Hiển thị địa chỉ IP
        var ipAddressElement = document.getElementById('ipAddress');
        ipAddressElement.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> Your IP: ' + ipAddress;
    })
    .catch(error => {
        console.error('Error fetching IP address:', error);
    });

// Lấy đối tượng div để hiển thị thời gian và ngày
var dateTimeElement = document.getElementById('dateTime');

// Hàm cập nhật thời gian và ngày
function updateDateTime() {
    // Tạo một đối tượng Date
    var currentDate = new Date();

    // Lấy thông tin thời gian và ngày
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Lưu ý: tháng trong JavaScript bắt đầu từ 0
    var year = currentDate.getFullYear();

    // Hiển thị thời gian và ngày trong định dạng mong muốn
    var dateTimeString = `<i class="fa-solid fa-calendar"></i> Your Time: ${hours}:${minutes}:${seconds} / ${day}.${month}.${year}`;
    
    // Gán giá trị vào đối tượng HTML
    dateTimeElement.innerHTML = dateTimeString;
}

// Gọi hàm cập nhật thời gian và ngày mỗi giây
setInterval(updateDateTime, 1000);

// Gọi hàm cập nhật thời gian và ngày lần đầu khi trang được tải
updateDateTime();

// Hàm để tăng số lượng người vào website và cập nhật trên trang
function updateVisitorCount() {
    // Kiểm tra xem có dữ liệu lượt truy cập trong local storage không
    var currentCount = localStorage.getItem('visitorCount');

    // Nếu không có, thiết lập giá trị ban đầu là 0
    if (!currentCount) {
        currentCount = 0;
    }

    // Tăng số lượng lượt truy cập
    currentCount++;

    // Lưu trữ số lượng lượt truy cập mới vào local storage
    localStorage.setItem('visitorCount', currentCount);

    // Hiển thị thông báo trên trang
    var visitorCountElement = document.getElementById('visitorCount');
    visitorCountElement.innerHTML = `<i class="fa-solid fa-user"></i> Bạn đã vào Website ${currentCount} lần!`;
}

// Gọi hàm cập nhật số lượng người vào website khi trang được tải
updateVisitorCount();

