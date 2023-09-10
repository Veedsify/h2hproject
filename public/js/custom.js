import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs'

// TOGGLE MENU
$(document).ready(function () {

    $("#menu-toggle").on("click", () => {
        $(".mobile-menu").toggleClass("active");
    })

    // MILESTONES OBSERVERS
    const intervalLoadItems = document.querySelectorAll(".interval-load")

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            let counter = 0;
            if (entry.isIntersecting) {
                const dataSpeedAttr = parseInt(entry.target.getAttribute("data-speed"))
                const countInterVal = setInterval(() => {
                    const dataStopAttr = parseInt(entry.target.getAttribute("data-stop"))
                    counter++
                    if (dataStopAttr > 1000) {
                        const formattedCounter = counter > 1000 ? (counter / 1000).toFixed(2) + "K" : counter.toString();
                        entry.target.innerHTML = formattedCounter;
                        observer.unobserve(entry.target)
                    } else {
                        entry.target.innerHTML = counter;
                        observer.unobserve(entry.target)
                    }
                    if (counter == dataStopAttr) {
                        clearInterval(countInterVal)
                        observer.unobserve(entry.target)
                    }
                }, dataSpeedAttr)

            }
        })
    }, { threshold: 1 })


    intervalLoadItems.forEach(interval => {
        observer.observe(interval)
    })


    const allImages = document.querySelectorAll("img.slide-in")

    const observer2 = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show")
                observer2.unobserve(entry.target)
            }
        })
    }, { threshold: .7 })

    allImages.forEach(interval => {
        observer2.observe(interval)
    })


    // INIT SWIPER

    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        autoplay: true,
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });

    // PAYSTACK REQUEST BTN

    async function initializePayments() {

        $(".overlay").addClass("active");

        try {

            // const { data: response } = await axios.post('/user/initiate-payment', {
            //     email: "dike@gmial.com"
            // })

            // window.location.href = response.authorization_url

            vex.dialog.open({
                message: 'Do Fill in the required details',
                input: [
                    `
                    <div class="mb-6">
                        <label for="fullname" class="mb-3">Fullname: </>
                        <input type="text" required class="custom-input block w-full px-3 py-2 mb-6" id="fullname" name="fullname">
                    </div>
                    <div class="mb-6">
                        <label for="email" class="mb-3">Email: </>
                        <input type="email" required class="custom-input block w-full px-3 py-2 mb-6" id="email" name="email">
                    </div>
                    <div class="mb-6">
                        <label for="phone" class="mb-3">Phone: </>
                        <input type="tel" required class="custom-input block w-full px-3 py-2 mb-6" id="phone" name="phone">
                    </div>
                  
                    `
                ].join(``),
                callback: async function (data) {
                    if (data) {
                        vex.dialog.alert({
                            unsafeMessage: `
                            <div class="flex items-center justify-center flex-col gap-3">
                                <img src="/images/load.gif" width="80">
                                <p class="text-red-500 text-lg">  please wait... </p>
                            </div>
                            <style>
                                .vex-dialog-button {
                                    pointer-events: none;
                                    display:none !important;
                                    background-color: #ccc;
                                }
                            </style>
                            `,
                        })

                        const { data: response } = await axios.post('/user/initiate-payment', {
                            email: data.email,
                            phone: data.phone,
                            first_name: data.fullname.split(" ")[0],
                            last_name: data.fullname.split(" ")[1]
                        })

                        if (response.authorization_url) {
                            window.location.href = response.authorization_url
                        } else {
                            vex.closeAll()
                            vex.dialog.alert({
                                message: response.message,
                                callback: (data) => {
                                    if (data) {
                                        $(".overlay").removeClass("active");
                                    }
                                }
                            })
                        }
                    }
                    $(".overlay").removeClass("active");
                }
            })

        } catch (err) {
            throw new Error(err)
        }
    }

    $("#initPayments").click(initializePayments)

    // PAYSTACK DONE



    // LOGIN LINK BTN
    $("#login-form").on("submit", async (e) => {
        e.preventDefault()
        const email = e.target.querySelector("#email")
        $(".overlay").addClass("active");

        try {
            vex.dialog.alert({
                unsafeMessage: `
                            <div class="flex items-center justify-center flex-col gap-3">
                                <img src="/images/load.gif" width="80">
                                <p class="text-red-500 text-lg">  please wait... </p>
                            </div>
                            `,
            })
            const signin = await axios.post('/login/new', {
                email: email.value
            })

            if (signin) {
                const { message } = signin.data
                vex.closeAll()
                vex.dialog.alert(message)
                $(".overlay").removeClass("active");
            }

        } catch (err) {
            console.log(err)
            vex.dialog.alert("Sorry an error occured!")
        }

    })

    // CONTACT FORM

    $("#contact-form").on("submit", async (e) => {
        e.preventDefault()
        const first_name = e.target.querySelector("#first_name").value
        const last_name = e.target.querySelector("#last_name").value
        const email = e.target.querySelector("#email2").value
        const emailCatchBots = e.target.querySelector("#email").value
        const subject = e.target.querySelector("#subject").value
        const message = e.target.querySelector("#message").value


        vex.dialog.alert({
            unsafeMessage: `
                            <div class="flex items-center justify-center flex-col gap-3">
                                <img src="/images/load.gif" width="80">
                                <p class="text-red-500 text-lg">  please wait... </p>
                            </div>
                            `,
        })

        if (emailCatchBots.length > 0) {
            vex.closeAll()
            vex.dialog.alert("Sorry an error occured while, please retry")
        }
        try {
            const sendMessage = await axios.post("/message/new", {
                first_name,
                last_name,
                email,
                subject,
                message
            })

            if (sendMessage) {
                vex.closeAll()
                vex.dialog.alert("Your Message Has Been Delivered, i will get back to you as soon as possible")
            }

        } catch (err) {
            console.log(err)
            vex.closeAll()
            vex.dialog.alert("Sorry an error occured while, please retry")
        }

    })


});