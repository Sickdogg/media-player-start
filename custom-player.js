//步驟一.得到所有的物件
const media = document.querySelector('video');
const controls = document.querySelector('.controls');

const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');

//步驟二.消除原本的控制器顯示自定義的控制器
media.removeAttribute('controls');
controls.style.visibility = 'visible';

//步驟三.定義控制器的方法
//播放按鈕監聽器
play.addEventListener('click',playPauseMedia);
//按下播放按鈕時的方法
function playPauseMedia(){
    //清除任何有關快轉跟倒轉的功能
    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
    //判斷是否正在播放
    if(media.paused){
        //改變樣式
        play.setAttribute('data-icon','u');
        media.play();
    }else{
        //改變樣式
        play.setAttribute('data-icon','P');
        media.pause();
    }
}

//停止按鈕監聽器
stop.addEventListener('click',stopMedia);
//當影片結束的監聽
media.addEventListener('ended',stopMedia);
//停止影片方法
function stopMedia(){
    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
    //暫停
    media.pause();
    //重置時間
    media.currentTime = 0;
    play.setAttribute('data-icon','P');
    
}

//倒帶
rwd.addEventListener('click', mediaBackward);
//快轉
fwd.addEventListener('click', mediaForward);

let intervalFwd;
let intervalRwd;

//倒帶方法
function mediaBackward() {
    //取消快轉方法
  clearInterval(intervalFwd);
  //移除快轉的樣式
  fwd.classList.remove('active');
  //判斷點擊時的情況-->true = 播放 false = 倒帶
  if(rwd.classList.contains('active')) {
    rwd.classList.remove('active');
    clearInterval(intervalRwd);
    media.play();
    play.setAttribute('data-icon','u');
  } else {
    rwd.classList.add('active');
    media.pause();
    play.setAttribute('data-icon','P');
    intervalRwd = setInterval(windBackward, 200);
  }
}
//快轉方法
function mediaForward() {
    //取消倒帶方法
  clearInterval(intervalRwd);
  //移除樣式
  rwd.classList.remove('active');
  //判斷點擊時的情況-->true = 播放 false = 快轉
  if(fwd.classList.contains('active')) {
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    media.play();
    play.setAttribute('data-icon','u');
  } else {
    fwd.classList.add('active');
    media.pause();
    play.setAttribute('data-icon','P');
    intervalFwd = setInterval(windForward, 200);
  }
}

function windBackward(){
    if(media.currentTime<=3){
        rwd.classList.remove('active');
        clearInterval(intervalRwd);
        stopMedia();
    }else{
        media.currentTime -= 3;
    }
}

function windForward(){
    if(media.currentTime >= media.duration -3){
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        stopMedia();    
    }else{
        media.currentTime += 3;
    }
}

//設置時間監聽器
media.addEventListener('timeupdate', setTime);

function setTime() {
    // 分
    const minutes = Math.floor(media.currentTime / 60);
    // 秒
    const seconds = Math.floor(media.currentTime - minutes * 60);
    //將不到兩位數的數字前面+0
    const minuteValue = minutes.toString().padStart(2, '0');
    //將不到兩位數的數字前面+0
    const secondValue = seconds.toString().padStart(2, '0');
  
    const mediaTime = `${minuteValue}:${secondValue}`;
    timer.textContent = mediaTime;
  
    const barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
    timerBar.style.width = `${barLength}px`;
  }