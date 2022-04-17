export default class Timer {
    constructor(root){
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector('.timer_mins'),
            seconds: root.querySelector('.timer_seconds'),
            start_btn: root.querySelector('.start_btn'),
            reset: root.querySelector('.reset_btn'),
        };


        this.interval = null;
        this.remainingSeconds = 0;

        this.updateInterfaceTime();
        this.updateInterfaceControls();

        this.el.start_btn.addEventListener('click', () => {

            if(this.interval === null) {
                this.start();
            }else{
                this.stop();
            }
        });

        this.el.reset.addEventListener('click', () => {

            const input_min = prompt('Enter time:');

            if(input_min < 1000) {
                this.stop();
                this.remainingSeconds = input_min * 60;
                this.updateInterfaceTime();
            }
        });
    }


    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
    
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
      }


      updateInterfaceControls() {
        if (this.interval === null) {
          this.el.start_btn.innerHTML = `<span class="material-icons">play_arrow</span>`;
          this.el.start_btn.classList.add("start_btn");
          this.el.start_btn.classList.remove("stop");
        } else {
          this.el.start_btn.innerHTML = `<span class="material-icons">pause</span>`;
          this.el.start_btn.classList.add("stop");
          this.el.start_btn.classList.remove("start_btn");
        }
      }

      start(){
          if(this.remainingSeconds == 0) return;
      

      this.interval = setInterval(() => {


        this.remainingSeconds--;
        this.updateInterfaceTime();

        if(this.remainingSeconds == 0){
            this.stop();
        }

      }, 1000);

      this.updateInterfaceControls();
    }

      stop(){
          clearInterval(this.interval);
          this.interval = null;

          this.updateInterfaceControls();
      }
    

    static getHTML(){
        return `
            <span class="timer_mins" style="background-color:white;">
            00
        </span>

        <span class="timer_colon" style="background-color:white;">
            :
        </span>

        <span class="timer_seconds" style="background-color:white;">
            00
        </span>
        <button type="button" class="start_btn">
            <span class="material-icons">play_circle_outline</span>
        </button>
        <button type="button" class="reset_btn">
            <span class="material-icons">timer</span>
        </button>
        `;
    }
}

