const PRODUCTS = [
  {
    "id": "椰蓉北海道吐司",
    "category": "toast new special",
    "name": "椰蓉北海道吐司",
    "keywords": "椰蓉 吐司",
    "image": "椰蓉北海道吐司.png",
    "description": "",
    "tag": "吐司",
    "variants": [
      {
        "id": "250g",
        "label": "250g",
        "priceCents": 1400
      },
      {
        "id": "450g",
        "label": "450g",
        "priceCents": 2200
      }
    ]
  },
  {
    "id": "脏脏包",
    "category": "new mix special",
    "name": "脏脏包",
    "keywords": "脏脏包",
    "image": "脏脏包.png",
    "description": "",
    "tag": "脏脏包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 1000
      }
    ]
  },
  {
    "id": "蜂蜜黄油吐司",
    "category": "new mix special",
    "name": "蜂蜜黄油吐司",
    "keywords": "蜂蜜 黄油 吐司",
    "image": "蜂蜜黄油吐司.png",
    "description": "",
    "tag": "蜂蜜黄油吐司",
    "variants": [
      {
        "id": "standard",
        "label": "1个",
        "priceCents": 500
      }
    ]
  },
  {
    "id": "芋泥肉松麻薯蛋糕盒子",
    "category": "new cakebox special",
    "name": "芋泥肉松麻薯蛋糕盒子",
    "keywords": "芋泥 肉松 麻薯 蛋糕盒子",
    "image": "芋泥肉松麻薯蛋糕盒子.png",
    "description": "",
    "tag": "蛋糕盒子",
    "variants": [
      {
        "id": "standard",
        "label": "1盒",
        "priceCents": 1200
      }
    ]
  },
  {
    "id": "芋泥肉松咸蛋黄麻薯吐司",
    "category": "toast",
    "name": "芋泥肉松咸蛋黄麻薯吐司",
    "keywords": "芋泥 肉松 咸蛋黄 麻薯 吐司",
    "image": "芋泥肉松咸蛋黄麻薯吐司.png",
    "description": "芋泥 肉松 咸蛋黄 麻薯四个元素可随意搭配 4选3价格14/22",
    "tag": "吐司",
    "variants": [
      {
        "id": "250g",
        "label": "250g",
        "priceCents": 1500
      },
      {
        "id": "450g",
        "label": "450g",
        "priceCents": 2300
      }
    ]
  },
  // {
  //   "id": "红豆肉松吐司",
  //   "category": "toast",
  //   "name": "红豆肉松吐司",
  //   "keywords": "红豆 肉松 红豆肉松 吐司",
  //   "image": "红豆肉松吐司.png",
  //   "description": "",
  //   "tag": "吐司",
  //   "variants": [
  //     { "id": "250g", "label": "250g", "priceCents": 1500 },
  //     { "id": "450g", "label": "450g", "priceCents": 2300 }
  //   ]
  // },
  {
    "id": "黑芝麻吐司",
    "category": "toast special",
    "name": "黑芝麻吐司",
    "keywords": "黑芝麻 吐司",
    "image": "黑芝麻吐司.png",
    "description": "这一款没有250g的哦 ~",
    "tag": "吐司",
    "variants": [
      {
        "id": "450g",
        "label": "450g",
        "priceCents": 1800
      }
    ]
  },
  {
    "id": "生巧吐司",
    "category": "toast",
    "name": "生巧吐司",
    "keywords": "巧克力 吐司",
    "image": "生巧吐司.png",
    "description": "",
    "tag": "吐司",
    "variants": [
      {
        "id": "250g",
        "label": "250g",
        "priceCents": 1400
      }
    ]
  },
  {
    "id": "番茄辣肉松吐司",
    "category": "toast",
    "name": "番茄辣肉松吐司",
    "keywords": "番茄 辣肉松 番茄辣肉松 吐司",
    "image": "番茄辣肉松吐司.png",
    "description": "",
    "tag": "吐司",
    "variants": [
      {
        "id": "250g",
        "label": "250g",
        "priceCents": 1500
      },
      {
        "id": "450g",
        "label": "450g",
        "priceCents": 2300
      }
    ]
  },
  {
    "id": "黑芝麻麻薯流心吐司",
    "category": "toast",
    "name": "黑芝麻麻薯流心吐司",
    "keywords": "黑芝麻 麻薯 流心 吐司",
    "image": "黑芝麻麻薯流心吐司.png",
    "description": "",
    "tag": "吐司",
    "variants": [
      {
        "id": "250g",
        "label": "250g",
        "priceCents": 1400
      },
      {
        "id": "450g",
        "label": "450g",
        "priceCents": 2200
      }
    ]
  },
  {
    "id": "肉松吐司",
    "category": "toast",
    "name": "肉松吐司",
    "keywords": "肉松 吐司",
    "image": "肉松吐司.png",
    "description": "",
    "tag": "吐司",
    "variants": [
      {
        "id": "250g",
        "label": "250g",
        "priceCents": 1400
      },
      {
        "id": "450g",
        "label": "450g",
        "priceCents": 2200
      }
    ]
  },
  {
    "id": "蓝莓碱水",
    "category": "jianshui special",
    "name": "蓝莓碱水",
    "keywords": "蓝莓 碱水",
    "image": "蓝莓碱水.png",
    "description": "",
    "tag": "碱水面包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 800
      }
    ]
  },
  {
    "id": "抹茶草莓碱水",
    "category": "jianshui",
    "name": "抹茶草莓碱水",
    "keywords": "抹茶 草莓 碱水",
    "image": "抹茶草莓碱水.png",
    "description": "",
    "tag": "碱水面包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 800
      }
    ]
  },
  {
    "id": "紫米乳酪碱水",
    "category": "jianshui",
    "name": "紫米乳酪碱水",
    "keywords": "紫米 乳酪 碱水",
    "image": "紫米乳酪碱水.png",
    "description": "",
    "tag": "碱水面包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 800
      }
    ]
  },
  {
    "id": "黑芝麻碱水",
    "category": "jianshui",
    "name": "黑芝麻碱水",
    "keywords": "黑芝麻 碱水",
    "image": "黑芝麻碱水.png",
    "description": "",
    "tag": "碱水面包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 800
      }
    ]
  },
  {
    "id": "蔓越莓乳酪碱水",
    "category": "jianshui special",
    "name": "蔓越莓乳酪碱水",
    "keywords": "蔓越莓 乳酪 碱水",
    "image": "蔓越莓乳酪碱水.png",
    "description": "",
    "tag": "碱水面包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 800
      }
    ]
  },
  {
    "id": "橙皮乳酪碱水",
    "category": "jianshui",
    "name": "橙皮乳酪碱水",
    "keywords": "橙皮 橙子 乳酪 碱水",
    "image": "橙皮乳酪碱水.png",
    "description": "",
    "tag": "碱水面包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 800
      }
    ]
  },
  {
    "id": "芋泥咸蛋黄欧包",
    "category": "oubao",
    "name": "芋泥咸蛋黄欧包",
    "keywords": "芋泥 咸蛋黄 欧包",
    "image": "芋泥咸蛋黄欧包.png",
    "description": "",
    "tag": "欧包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 1000
      }
    ]
  },
  {
    "id": "抹茶草莓欧包",
    "category": "oubao",
    "name": "抹茶草莓欧包",
    "keywords": "抹茶 草莓 欧包",
    "image": "comingsoon.png",
    "description": "",
    "tag": "欧包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 1000
      }
    ]
  },
  {
    "id": "蔓越莓乳酪欧包",
    "category": "oubao",
    "name": "蔓越莓乳酪欧包",
    "keywords": "蔓越莓 乳酪 欧包",
    "image": "蔓越莓乳酪欧包.png",
    "description": "",
    "tag": "欧包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 800
      }
    ]
  },
  {
    "id": "紫米乳酪欧包",
    "category": "oubao",
    "name": "紫米乳酪欧包",
    "keywords": "紫米 乳酪 欧包",
    "image": "紫米乳酪欧包.png",
    "description": "",
    "tag": "欧包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 800
      }
    ]
  },
  {
    "id": "抹茶红豆麻薯欧包",
    "category": "oubao",
    "name": "抹茶红豆麻薯欧包",
    "keywords": "紫米 乳酪 欧包",
    "image": "抹茶红豆麻薯欧包.png",
    "description": "",
    "tag": "欧包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 800
      }
    ]
  },
  {
    "id": "抹茶奶酥红豆欧包",
    "category": "oubao",
    "name": "抹茶奶酥红豆欧包",
    "keywords": "紫米 乳酪 欧包",
    "image": "comingsoon.png",
    "description": "",
    "tag": "欧包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 800
      }
    ]
  },
  {
    "id": "芋泥肉松麻薯欧包",
    "category": "oubao",
    "name": "芋泥肉松麻薯欧包",
    "keywords": "紫米 乳酪 欧包",
    "image": "comingsoon.png",
    "description": "",
    "tag": "欧包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 900
      }
    ]
  },
  {
    "id": "芋泥紫米欧包",
    "category": "oubao",
    "name": "芋泥紫米欧包",
    "keywords": "紫米 芋泥 欧包",
    "image": "comingsoon.png",
    "description": "",
    "tag": "欧包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 800
      }
    ]
  },
  {
    "id": "抹茶黑芝麻乳酪欧包",
    "category": "oubao",
    "name": "抹茶黑芝麻乳酪欧包",
    "keywords": "抹茶 乳酪 黑芝麻 欧包",
    "image": "抹茶黑芝麻乳酪欧包.png",
    "description": "",
    "tag": "欧包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 800
      }
    ]
  },
  {
    "id": "抹茶黑芝麻奶酥欧包",
    "category": "oubao",
    "name": "抹茶黑芝麻奶酥欧包",
    "keywords": "抹茶 黑芝麻 欧包",
    "image": "抹茶黑芝麻奶酥欧包.png",
    "description": "",
    "tag": "欧包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 800
      }
    ]
  },
  {
    "id": "提拉米苏菠萝包",
    "category": "pineapple",
    "name": "提拉米苏菠萝包",
    "keywords": "菠萝包",
    "image": "提拉米苏菠萝包.png",
    "description": "非常驻产品",
    "tag": "菠萝包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 1000
      }
    ]
  },
  {
    "id": "抹茶提拉米苏菠萝包",
    "category": "pineapple",
    "name": "抹茶提拉米苏菠萝包",
    "keywords": "菠萝包",
    "image": "抹茶提拉米苏菠萝包.png",
    "description": "非常驻产品",
    "tag": "菠萝包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 1000
      }
    ]
  },
  {
    "id": "盘挞",
    "category": "tart",
    "name": "盘挞",
    "keywords": "盘挞",
    "image": "盘挞.png",
    "description": "",
    "tag": "盘挞",
    "variants": [
      {
        "id": "pack-2",
        "label": "2个/份",
        "priceCents": 800
      }
    ]
  },
  {
    "id": "巧克力盘挞",
    "category": "tart",
    "name": "巧克力盘挞",
    "keywords": "巧克力盘挞",
    "image": "巧克力盘挞.png",
    "description": "",
    "tag": "盘挞",
    "variants": [
      {
        "id": "pack-2",
        "label": "2个/份",
        "priceCents": 900
      }
    ]
  },
  {
    "id": "开心果蓝莓米面包",
    "category": "rice",
    "name": "开心果蓝莓米面包",
    "keywords": "开心果 蓝莓 米面包",
    "image": "开心果蓝莓米面包.png",
    "description": "",
    "tag": "米面包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 900
      }
    ]
  },
  {
    "id": "三重抹茶米面包",
    "category": "rice",
    "name": "三重抹茶米面包",
    "keywords": "抹茶 米面包",
    "image": "三重抹茶米面包.png",
    "description": "",
    "tag": "米面包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 900
      }
    ]
  },
  {
    "id": "抹茶伯爵红茶米面包",
    "category": "rice",
    "name": "抹茶伯爵红茶米面包",
    "keywords": "米面包",
    "image": "抹茶伯爵红茶米面包.png",
    "description": "",
    "tag": "米面包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 900
      }
    ]
  },
  {
    "id": "抹茶豆乳米面包",
    "category": "rice",
    "name": "抹茶豆乳米面包",
    "keywords": "抹茶 豆乳 米面包",
    "image": "抹茶豆乳米面包.png",
    "description": "",
    "tag": "米面包",
    "variants": [
      {
        "id": "standard",
        "label": "1份",
        "priceCents": 900
      }
    ]
  },
  {
    "id": "黄油年糕",
    "category": "butter special",
    "name": "黄油年糕",
    "keywords": "黄油年糕",
    "image": "黄油年糕.png",
    "description": "",
    "tag": "黄油年糕",
    "variants": [
      {
        "id": "pack-6",
        "label": "6个/份",
        "priceCents": 1000
      },
      {
        "id": "pack-12",
        "label": "12个/份",
        "priceCents": 1500
      }
    ]
  },
  {
    "id": "抹茶流心酥皮塔",
    "category": "mix special",
    "name": "抹茶流心酥皮塔",
    "keywords": "抹茶流心酥皮塔",
    "image": "抹茶流心酥皮塔.png",
    "description": "",
    "tag": "酥皮塔",
    "variants": [
      {
        "id": "pack-1",
        "label": "1个",
        "priceCents": 1000
      }
    ]
  },
  {
    "id": "芋泥雪贝",
    "category": "new mix special",
    "name": "芋泥雪贝",
    "keywords": "芋泥 芋泥雪贝",
    "image": "芋泥雪贝.png",
    "description": "",
    "tag": "芋泥雪贝",
    "variants": [
      {
        "id": "pack-3",
        "label": "3个/份",
        "priceCents": 1100
      }
    ]
  },
  {
    "id": "桂花酒酿蛋糕盒子",
    "category": "new mix cakebox special",
    "name": "桂花酒酿蛋糕盒子",
    "keywords": "桂花酒酿蛋糕盒子",
    "image": "桂花酒酿蛋糕盒子.png",
    "description": "",
    "tag": "蛋糕盒子",
    "variants": [
      {
        "id": "standard",
        "label": "1盒",
        "priceCents": 1200
      }
    ]
  },
  {
    "id": "芋泥紫米奶酪盒子",
    "category": "new mix cakebox special",
    "name": "芋泥紫米奶酪盒子",
    "keywords": "芋泥紫米奶酪盒子",
    "image": "芋泥紫米奶酪盒子.png",
    "description": "",
    "tag": "蛋糕盒子",
    "variants": [
      {
        "id": "standard",
        "label": "1盒",
        "priceCents": 1100
      }
    ]
  }
];
