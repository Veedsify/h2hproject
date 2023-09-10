const queryDb = require("../libs/prisma");
const crypto = require('crypto')
const data = [
    {
        h2h_id: "1",
        h2h_title: "Introduction",
        h2h_content: "The Tools For Easy Connection.",
        h2h_image: "./assets/img/h2hproject/Slide1.PNG",
        h2h_link: "1",
        h2h_code: "1",
    },
    {
        h2h_id: "2",
        h2h_title: "Tool 1: Pray First",
        h2h_content:
            "Connections that can withstand the strength of time are spiritually ordained... it's best to always begin your request in the spiritual through prayers.",
        h2h_image: "./assets/img/h2hproject/Slide2.PNG",
        h2h_link: "2",
        h2h_code: "2",
    },
    {
        h2h_id: "3",
        h2h_title: "Tool 2: Your Attitude.",
        h2h_content:
            "Your Attitude, Habits and Character makes 90% of your beauty.",
        h2h_image: "./assets/img/h2hproject/Slide3.PNG",
        h2h_link: "3",
        h2h_code: "3",
    },
    {
        h2h_id: "4",
        h2h_title: "Tool 3: Your Natural Endowments.",
        h2h_content:
            "Spinsters, always maintain your God's given natural endowments. Do not get too fat due to unhealthy feeding habits nor get all dried up either. Your body structure is your tool for easy connection. Keep fit and look good.",
        h2h_image: "./assets/img/h2hproject/Slide4.PNG",
        h2h_link: "4",
        h2h_code: "4",
    },
    {
        h2h_id: "5",
        h2h_title: "Tool 4: Your Face.",
        h2h_content:
            "The face is your First point of attraction as a single lady... ALWAYS wear a glowing face at all times before leaving the walls of your house. Also avoid\r\n<br>\r\n<br>\r\n<ol>\r\n<li>Crazy make-ups,</li>\r\n<li>Hairy armpit</li>\r\n<li>Plaque on your tooth</li>\r\n<li>Dirts in Finger nails and offensive smells.</li>\r\n</ol>\r\n<br>\r\nThese observations gives an impression of poor hygiene and could be a barrier to your connection.",
        h2h_image: "./assets/img/h2hproject/Slide5.PNG",
        h2h_link: "5",
        h2h_code: "5",
    },
    {
        h2h_id: "6",
        h2h_title: "Tool 5: Your Dressing Says A Lot About You.",
        h2h_content:
            "Generally, we are addressed the way we dress. An immorally dressed single lady could be addressed like a promoter of immorality. Ladies, be mindful of your appearance 'Cos it's speaks a lot about you.",
        h2h_image: "./assets/img/h2hproject/Slide6.PNG",
        h2h_link: "6",
        h2h_code: "6",
    },
    {
        h2h_id: "7",
        h2h_title: "Tool 6: Create Special Time For Your Date.",
        h2h_content:
            "For the working class spinsters...Always attend official parties, dinners or gatherings especially when it involves external business partners.<br><br> Do not lock out yourself in the name of ...I, m working late. Sacrifice your time for a date. Do not use it as an excuse to turn down a prospective suitor, for millions of ladies are praying for that date invite. Use your opportunities wisely.",
        h2h_image: "./assets/img/h2hproject/Slide7.PNG",
        h2h_link: "7",
        h2h_code: "7",
    },
    {
        h2h_id: "8",
        h2h_title: "Tool 7: Create A Solid Association With The Father.",
        h2h_content:
            "An association with fathers increases chances of been connected.\r\n<br>\r\nReasons.\r\n<br>\r\n<ol>\r\n<li>The father's peers are opposite sex and they can easily notice that pretty damsel.</li>\r\n<li>Some might quickly recommend you for their sons.</li>\r\n<li>Some might want you for a second wife if you are interested.</li>\r\n<li>The widower amongst them will want you to fill in that gap in their lives... Spinsters give these a taught.</li>\r\n</ol>",
        h2h_image: "./assets/img/h2hproject/Slide8.PNG",
        h2h_link: "8",
        h2h_code: "8",
    },
    {
        h2h_id: "9",
        h2h_title: "Tool 8: Keep Him Closer Than your Friends.",
        h2h_content:
            "Statistics shows that most genuine guys without confidence, finds it difficult coming closer when she is always with her peers,\r\n<br>\r\n<br>\r\nSometimes, they feel they might be embarrassed... An outing alone brings him closer without a hitch. It's a promise.",
        h2h_image: "./assets/img/h2hproject/Slide9.PNG",
        h2h_link: "9",
        h2h_code: "9",
    },
    {
        h2h_id: "10",
        h2h_title: "Tool 9: Wealth Scares Away Most Men.",
        h2h_content:
            "Sometimes, Wealth display by spinsters, scares away prospective suitors. Instead, Suitors will prefer to go for moderate and simple lady they can build and grow with.",
        h2h_image: "./assets/img/h2hproject/Slide10.PNG",
        h2h_link: "10",
        h2h_code: "10",
    },
    {
        h2h_id: "11",
        h2h_title: "Tool 10: Acts of Charity.",
        h2h_content:
            "Acts of charity makes spinster more attractive to responsible people in the society. Embark on them today and you will be amazed at the recognition you will attract.",
        h2h_image: "./assets/img/h2hproject/Slide11.PNG",
        h2h_link: "11",
        h2h_code: "11",
    },
    {
        h2h_id: "12",
        h2h_title: "Tool 11: Bad Company Corrupt Good Manner.",
        h2h_content:
            "If a decent spinster associates with ladies notorious of certain unacceptable characters, she could be judged wrongly...\r\n<br><br>\r\nDon't allow the adage that says ... show me your friend and I will tell you who you are- becomes applicable to you... Watch the company you keep because bad company ruins good morals",
        h2h_image: "./assets/img/h2hproject/Slide12.PNG",
        h2h_link: "12",
        h2h_code: "12",
    },
    {
        h2h_id: "13",
        h2h_title: "Tool 12: Take Note Of Time Wasters.",
        h2h_content:
            "There are group of guys described as the <b>TIME WASTERS</b>. They keep her in relationship for ages without stepping the union further. Let's not forget that the best time for him as a man might be the wrong time for her as a lady. Be vigilant.",
        h2h_image: "./assets/img/h2hproject/Slide13.PNG",
        h2h_link: "13",
        h2h_code: "13",
    },
    {
        h2h_id: "14",
        h2h_title: "Tool 13: The Way to a Man's Heart is through his STOMACH.",
        h2h_content:
            "Most Bachelors needs that lady that can care for his stomach(domestic), that will be supportive and not a liability(industrious), that is neat and presentable(hygienic), that listens to his opinion(obedient) and has sweetness of attitude(hospitable). When he observes these qualities in her, it's always very difficult to let go.",
        h2h_image: "./assets/img/h2hproject/Slide14.PNG",
        h2h_link: "14",
        h2h_code: "14",
    },
    {
        h2h_id: "15",
        h2h_title:
            "Tool 14: Do Not Anticipate Serious Commitments From Late-Night Clubs.",
        h2h_content:
            "The late-night clubs are places you meet people only ready for fun and not for serious commitment. A very wrong place to anticipate a suitor.",
        h2h_image: "./assets/img/h2hproject/Slide15.PNG",
        h2h_link: "15",
        h2h_code: "15",
    },
    {
        h2h_id: "16",
        h2h_title: "Tool 15: Start Thinking Like A Wife.",
        h2h_content:
            "That Bachelor will chose that lady with good home management skills... To be selected, learn to start thinking and acting like a wife...A girlfriend might think of only spending, but a wife will think of conserving and planning for the future.",
        h2h_image: "./assets/img/h2hproject/Slide16.PNG",
        h2h_link: "16",
        h2h_code: "16",
    },
    {
        h2h_id: "17",
        h2h_title: "Tool 16: Do Your Chores.",
        h2h_content:
            "To our mothers. Devoting time training your maid on domestics and ignoring your precious daughter is a lifetime mistake. Let your daughter learn whatever you teach your maid for these trainings makes her better suited for a wife material.",
        h2h_image: "./assets/img/h2hproject/Slide17.PNG",
        h2h_link: "17",
        h2h_code: "17",
    },
    {
        h2h_id: "18",
        h2h_title: "Tool 17: Listen Carefully.",
        h2h_content:
            "It's sometimes necessary to give listening ears to a prospect, but <b>FLEE</b> when his intentions are not genuine.",
        h2h_image: "./assets/img/h2hproject/Slide18.PNG",
        h2h_link: "18",
        h2h_code: "18",
    },
    {
        h2h_id: "19",
        h2h_title: "Tool 18: Create A Good First Impression.",
        h2h_content:
            "Tools for easy connection.\r\n<br>\r\n<ol>\r\n<li>Create a good first impression in his mind.</li>\r\n<li>Identify his likes and dislikes.</li>\r\n<li>Focus on doing only those things he likes.</li>\r\n</ol>\r\n<br>\r\nThe rest is history.",
        h2h_image: "./assets/img/h2hproject/Slide19.PNG",
        h2h_link: "19",
        h2h_code: "19",
    },
    {
        h2h_id: "20",
        h2h_title: "Tool 19: Be Fashionable & Decent.\r\n",
        h2h_content:
            'A fashionable but decent appearance is recommended for easy connection. In addition, sensitive parts <b style="color:red;">MUST</b> not be exposed in other to be attractive.',
        h2h_image: "./assets/img/h2hproject/Slide20.PNG",
        h2h_link: "20",
        h2h_code: "20",
    },
    {
        h2h_id: "21",
        h2h_title: "Tool 20: Smell Good & Nice.",
        h2h_content:
            "A major repellent to connection is offensive smell. That suitor will come REAL closer when he discovered that she can effectively manage that strong character of sweat. Smell nice at all times.",
        h2h_image: "./assets/img/h2hproject/Slide21.PNG",
        h2h_link: "21",
        h2h_code: "21",
    },
    {
        h2h_id: "22",
        h2h_title: "Tool 21: Take Control Of Habits & Addiction.",
        h2h_content:
            "Some habits and addictions, sometimes affects compatibility b/w partners. Self-discipline & control are highly recommended.",
        h2h_image: "./assets/img/h2hproject/Slide22.PNG",
        h2h_link: "22",
        h2h_code: "22",
    },
    {
        h2h_id: "23",
        h2h_title: "Tool 22: Speak To Someone More Experienced Than You.",
        h2h_content:
            "If he turns his back all of a sudden, there just could be something wrong. Speaking with a more experienced person for better understanding can help address the issue.\r\n<br>\r\nMistakes are bound to happen, for we all have our imperfections. Be humble to ask questions cos life is a learning process",
        h2h_image: "./assets/img/h2hproject/Slide23.PNG",
        h2h_link: "23",
        h2h_code: "23",
    },
    {
        h2h_id: "24",
        h2h_title:
            "Tool 23: Understand your Differences in Culture, Customs and Traditions.",
        h2h_content:
            "Every Father and Mother In-laws will NEVER be an opposition to her connection. If only that spinster understands that there are differences in culture, customs / tradition.\r\n<br>\r\n<br>\r\nLadies, learn to QUICKLY adapt and have some respect for the ways of life of your in-laws. Then you will get the love / affection you desire in your matrimonial home.",
        h2h_image: "./assets/img/h2hproject/Slide24.PNG",
        h2h_link: "24",
        h2h_code: "24",
    },
    {
        h2h_id: "25",
        h2h_title: "Tool 24: Attend Responsible Social Gathering.",
        h2h_content:
            "As much as it's encouraged for spinsters to be reserved, it's also VERY important that they create some time and attend <b>RESPONSIBLE</b> social gatherings. This is because, there just could be that secret admirer, who is <b>GENUINELY</b> ready to connect. Give it a trial.",
        h2h_image: "./assets/img/h2hproject/Slide25.PNG",
        h2h_link: "25",
        h2h_code: "25",
    },
    {
        h2h_id: "26",
        h2h_title: "Tool 25: Know your class.",
        h2h_content:
            "Bitter truth…. Most Bachelors classify ladies into two groups\r\n<br><br>\r\n<ol>\r\n<li>Wife material</li>\r\n<li>Backyard chick.</li>\r\n</ol>\r\n<br><br>\r\nAfter several outings with group 2 they still go searching for that wife material...Question... What makes the difference? Apart from...Simplicity, Obedience, Domestic, Hygienic, Hospitable and others, Everyman wants a lady with IDEAS on how to MULTIPLY his income and not the contrary. Ladies, start birthing those ideas of yours and you will notice a difference.",
        h2h_image: "./assets/img/h2hproject/Slide26.PNG",
        h2h_link: "26",
        h2h_code: "26",
    },
    {
        h2h_id: "27",
        h2h_title: "Tool 26: Career vs Connection.",
        h2h_content:
            "Career vs Connection. For that employed spinster...Kindly note that most companies are eager to maximize every last working hour from his/her employees. If it pertains to you and you can't create a balance.\r\nDon’t be afraid to give out those jobs that SQUEEZES out your LIFE Look out for those sectors E.g. education or entrepreneurship) that can give you more FLEXIBILITY to date and potentially have a family. Remember, we CAN'T return the hands of time.",
        h2h_image: "./assets/img/h2hproject/Slide27.PNG",
        h2h_link: "27",
        h2h_code: "27",
    },
    {
        h2h_id: "28",
        h2h_title: "Tool 27: Go Get It Right.",
        h2h_content:
            "Now you have the power to create connection, take these tools and go get it right.",
        h2h_image: "./assets/img/h2hproject/Slide28.PNG",
        h2h_link: "28",
        h2h_code: "28",
    },
    {
        h2h_id: "29",
        h2h_title: "Thank You",
        h2h_content: "Thank You",
        h2h_image: "./assets/img/h2hproject/Slide29.PNG",
        h2h_link: "29",
        h2h_code: "29",
    },
];

async function runAddScript(item, index) {
    const id = crypto.randomBytes(22).toString('hex');
    const insertOne = await queryDb.h2h_course.create({
        data: {
            h2h_id: index + 1,
            h2h_title: item.h2h_title,
            h2h_content: item.h2h_content,
            h2h_image: `/images/course/Slide_${id}.png`,
            h2h_link: `https://h2hproject/course/${id}`,
            h2h_string_id: id,
            h2h_code: index + 345
        }
    });
    console.log(`Inserted ${index}`);
    return insertOne;
}

async function insertAllData() {
    for (let index = 0; index < data.length; index++) {
        await runAddScript(data[index], index);
    }
}

insertAllData()
    .then(() => {
        // All inserts completed successfully
        console.log('All inserts completed.');
        process.exit(0);
    })
    .catch(error => {
        console.error('Error:', error);
        process.exit(1); // Exit with an error code
    });