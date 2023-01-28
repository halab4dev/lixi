import {Winwheel} from "../lib/Winwheel";
import {Amplify, API, graphqlOperation} from 'aws-amplify';
import awsconfig from "./aws-exports";
import {createLixi} from "./graphql/mutations";
import {listLixiByYear} from "./graphql/queries";
import {onLixiCreateByYear} from "./graphql/subscriptions";

Amplify.configure(awsconfig);


let theWheel;
let isWheelSpinning = false;
let spinButton = document.getElementById("spin-button");
let nameInput = document.getElementById("name-input");
const resultList = document.getElementById("result-list");
let audio = new Audio('../sound/Chinese_Firecracker.mp3'); // Create audio object and load desired file.

const initTheWheel = async function () {
    const segments = [
        {fillStyle: '#E40308', text: '10K', textFillStyle: '#FFF1E2'},
        {fillStyle: '#FFF1E2', text: '20K', textFillStyle: '#E40308'},
        {fillStyle: '#E40308', text: '10K', textFillStyle: '#FFF1E2'},
        {fillStyle: '#FFF1E2', text: '20K', textFillStyle: '#E40308'},
        {fillStyle: '#E40308', text: '10K', textFillStyle: '#FFF1E2'},
        {fillStyle: '#FFF1E2', text: '50K', textFillStyle: '#E40308'},
        {fillStyle: '#E40308', text: '10K', textFillStyle: '#FFF1E2'},
        {fillStyle: '#FFF1E2', text: '20K', textFillStyle: '#E40308'},
        {fillStyle: '#E40308', text: '10K', textFillStyle: '#FFF1E2'},
        {fillStyle: '#FFF1E2', text: '20K', textFillStyle: '#E40308'},
        {fillStyle: '#E40308', text: '10K', textFillStyle: '#FFF1E2'},
        {fillStyle: '#FFF1E2', text: '50K', textFillStyle: '#E40308'},
        {fillStyle: '#E40308', text: '10K', textFillStyle: '#FFF1E2'},
        {fillStyle: '#FFF1E2', text: '100K', textFillStyle: '#E40308'}

    ];
    theWheel = new Winwheel({
        numSegments: segments.length,
        outerRadius: 150,
        pointerAngle: 135,
        responsive: true,
        // pointerGuide: {       // Turn pointer guide on.
        //     display: true,
        //     strokeStyle: 'red',
        //     lineWidth: 3
        // },
        segments: segments,
        pins: {
            fillStyle: '#F7EF8A',
            strokeStyle: 'grey'
        },
        animation: {
            type: 'spinToStop',
            duration: 10,
            spins: 8,
            callbackFinished: showPrize
        }
    });
}

const spin = async function () {
    if (!isWheelSpinning) {
        audio.play();

        spinButton.disabled = true;
        spinButton.className = 'spin-button spin-button-disable';

        theWheel.startAnimation();
        isWheelSpinning = true;
    }
}

const showPrize = function (indicatedSegment) {
    const name = nameInput.value;
    const money = indicatedSegment.text;

    createNewLixi(name, money)
    alert(`Chúc mừng năm mới, ${name}\nBạn đã nhận được ${money}`);

    audio.pause();
    audio.currentTime = 0;
}

const createNewLixi = async function (name, money) {
    await API.graphql({
        query: createLixi,
        variables: {
            input: {
                name: name,
                money: money,
                year: new Date().getFullYear()
            }
        },
        authMode: 'API_KEY'
    });
}

const addEventListener = function () {
    spinButton.addEventListener("click", () => {
        spin();
    });
}

const getResult = async function () {
    const response = await API.graphql({
        query: listLixiByYear,
        variables: {
            year: new Date().getFullYear(),
            sortDirection: 'DESC'
        },
        authMode: 'API_KEY'
    });
    const lixiList = response.data.listLixiByYear.items;
    lixiList.forEach(lixi => {
        resultList.innerHTML += renderLixi(lixi);
    });
}

const renderLixi = function (lixi) {
    const localDate = new Date(lixi.createdAt);
    const month = localDate.getMonth() + 1;
    const date = localDate.getDate();
    const hour = localDate.getHours();
    const minute = localDate.getMinutes();
    const color = lixi.money === '100K' ? '#FF00FF' :
        lixi.money === '50K' ? 'red' :
            lixi.money === '20K' ? '#1E90FF' : 'black';
    return `<br/><span style="color: ${color}">${date}/${month} ${hour}:${minute} - ${lixi.name} - ${lixi.money}</span>`
}

const subscribeResultList = async function () {
    API.graphql(graphqlOperation(onLixiCreateByYear, {year: new Date().getFullYear()}))
        .subscribe({
            next: (response) => {
                const lixi = response.value.data.onLixiCreateByYear;
                resultList.innerHTML = renderLixi(lixi) + resultList.innerHTML;
            },
        });
}

const init = async function () {
    await initTheWheel();
    addEventListener();
    getResult();
    subscribeResultList();
}

init();