$(function () {
  if (data.ResultCode == 0) {
    setList(data.Data);
  }
  addTabEvent();

  // 填充列表数据
  function setList(data) {
    let ulHtml = '<ul class="container">';
    for (let i = 0; i < data.length; i++) {
      let li = `<li data-index=${i}>
                <img src="${data[i].Avatar}" alt>
                <div class="con">
                  <p class="name">${data[i].Name}</p>
                  <p class="address">${data[i].LawFirm}</p>
                  <span class="id">${data[i].ID}</span>
                </div>
              </li>`;
      ulHtml += li;
    }
    ulHtml += '</ul>';
    $('.list').append(ulHtml);
    $('.container li').on('click', function () {
      let index = parseInt($(this).attr('data-index'));
      alert(data[index].GoodAt);
    })
  }
  // 添加tab点击切换
  function addTabEvent() {
    $('#Tab a').on('click', function (e) {
      let id = $(this).attr('data-id');
      switchTab(id);
    })
    function switchTab(id) {
      $('#Tab a').removeClass('active').eq(id).addClass('active');
      $('.list,.info').hide();
      if (id === '0') {
        $('.list').show();
      } else if (id === '1') {
        $('.info').show();
      }
    }
  }
})

let data = {
  "Data": [
    {
      "ID": 2,
      "Name": "吴波",
      "Avatar": "http://userpic-litchi.jstv.com/UserHelp/20190308/20193815503964588767.png",
      "LawFirm": "江苏苏博律师事务所",
      "GoodAt": "融资租赁纠纷、经济犯罪、经济纠纷",
      "Intro": null
    },
    {
      "ID": 3,
      "Name": "伍厚智",
      "Avatar": "http://userpic-litchi.jstv.com/UserHelp/20190308/20193815520493587998.png",
      "LawFirm": "江苏马健律师事务所",
      "GoodAt": "建设工程、公司商事管理、PPP项目",
      "Intro": null
    },
    {
      "ID": 4,
      "Name": "韩旗",
      "Avatar": "http://userpic-litchi.jstv.com/UserHelp/20190308/20193815525792436808.png",
      "LawFirm": "江苏中虑律师事务所",
      "GoodAt": "建筑工程房地产、金融、环境资源",
      "Intro": null
    },
    {
      "ID": 5,
      "Name": "赵小宝",
      "Avatar": "http://userpic-litchi.jstv.com/UserHelp/20190308/20193815534022715337.png",
      "LawFirm": "江苏德善律师事务所",
      "GoodAt": "征地拆迁、建设工程、商标专利",
      "Intro": null
    },
    {
      "ID": 6,
      "Name": "朱瑞雪",
      "Avatar": "http://userpic-litchi.jstv.com/UserHelp/20190308/20193815542613393644.jpg",
      "LawFirm": "江苏舜点律师事务所",
      "GoodAt": "劳动纠纷、人身损害赔偿、刑事案件",
      "Intro": null
    }
  ],
  "ResultCode": 0,
  "Message": "获取律师列表成功"
}
