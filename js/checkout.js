var cardContainer = document.getElementById("cart-item-container");
var totalAmount = document.getElementById("total-amount");
var numberOfItem = document.getElementById("number-of-item");

var myLocalStorageData = JSON.parse(window.localStorage.getItem("product-list"));
console.log(myLocalStorageData);
/* <div class="item">
<img src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/5649908/2018/5/10/6bfe80cd-2f55-42bc-aa7f-e0d6c9e2ac531525936414747-SASSAFRAS-Women-Blue-Solid-Shirt-Dress-3831525936414532-1.jpg" alt="product-img">
<div class="detail">
    <h3>Women Blue Solid Shirt Dress</h3>
    <p>x1</p>
    <p>Amount: 5200</p>
</div> */
// iPreview, iName, iCount, iPrice


function createItemOnCheckOut(data) {
    var item = document.createElement("div");
    item.className = 'item';

    var itemImg = document.createElement("img");
    itemImg.src = data.preview;
    item.appendChild(itemImg);

    var itemDetail = document.createElement("div");
    itemDetail.className = 'detail';
    item.appendChild(itemDetail);


    var itemName = document.createElement("h3");
    itemName.innerHTML = data.title;
    itemDetail.appendChild(itemName);

    var itemCount = document.createElement("p");
    itemCount.innerHTML = 'x' + data.count;
    itemDetail.appendChild(itemCount);

    var itemPrice = document.createElement("p");
    itemPrice.innerHTML = 'Amount:' + (data.count * data.price);
    itemDetail.appendChild(itemPrice);
    return item;
}

for (var x = 0; x < myLocalStorageData.length; x++) {
    cardContainer.append(createItemOnCheckOut(myLocalStorageData[x]));
}
var cost = 0;
var counter = 0;

for (var y = 0; y < myLocalStorageData.length; y++) {
    // console.log('count ',myLocalStorageData[y].count);
    counter += myLocalStorageData[y].count;
    // console.log('Totalcount ', counter);

    // console.log(counter);
    cost += parseInt(myLocalStorageData[y].count) * parseInt(myLocalStorageData[y].price);
    // console.log(cost);
}
totalAmount.innerHTML = cost;
numberOfItem.innerHTML = counter;
console.log('counter ' + counter);

var placeOrder = document.getElementById("place-order");
var placeOrderLink = document.getElementById("place-order-link");

placeOrder.addEventListener("click", function() {
    $.post('https://5d76bf96515d1a0014085cf9.mockapi.io/order', myLocalStorageData, function() {
            alert('order sucessfull');
        })
        // setTimeout(function() { alert("Hello"); }, 3000);

    myLocalStorageData = window.localStorage.removeItem("product-list");
    cartC = window.localStorage.setItem("cart-count", "0");
    var cost = 0;
    counter = 0;
    for (var i = 0; i < myLocalStorageData.length; i++) {
        counter += myLocalStorageData[i].count;

    }

    totalAmount.innerHTML = cost;
    numberOfItem.innerHTML = counter;
    console.log('counter new ' + counter);
    location.href = "./orderconfirm.html";

});