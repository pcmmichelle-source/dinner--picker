"use client";

import React from "react";

export default function RandomDinnerPicker() {
  const cuisineData = {
    川菜: {
      type: "中餐",
      foods: [
        "水煮肉片",
        "麻婆豆腐",
        "回锅肉",
        "鱼香肉丝",
        "宫保鸡丁",
        "辣子鸡",
        "毛血旺",
        "酸菜鱼",
        "烤鱼"
      ]
    },
    粤菜: {
      type: "中餐",
      foods: [
        "蒜蓉西兰花",
        "白灼菜心",
        "蒸蛋",
        "烧鹅饭",
        "叉烧饭",
        "广式烧腊",
        "煲汤",
        "广式点心",
        "早茶"
      ]
    },
    湘菜: {
      type: "中餐",
      foods: [
        "农家小炒肉",
        "辣椒炒肉",
        "剁椒鱼头",
        "香干肉丝",
        "手撕包菜"
      ]
    },
    东北菜: {
      type: "中餐",
      foods: [
        "锅包肉",
        "地三鲜",
        "东北乱炖",
        "铁锅炖",
        "酸辣土豆丝"
      ]
    },
    家常炒菜: {
      type: "炒菜",
      foods: [
        "番茄炒蛋",
        "黄瓜炒蛋",
        "蒜蓉娃娃菜",
        "蒜蓉西兰花",
        "青椒肉丝",
        "糖醋里脊",
        "红烧排骨",
        "可乐鸡翅",
        "黑椒牛柳",
        "铁板牛肉",
        "葱爆羊肉"
      ]
    },
    火锅烧烤: {
      type: "聚餐",
      foods: [
        "重庆火锅",
        "潮汕牛肉火锅",
        "串串香",
        "烧烤",
        "韩式烤肉",
        "日式烤肉"
      ]
    },
    面食米饭: {
      type: "主食",
      foods: [
        "牛肉面",
        "兰州拉面",
        "炸酱面",
        "热干面",
        "炒饭",
        "扬州炒饭",
        "煲仔饭",
        "黄焖鸡米饭"
      ]
    },
    日料: {
      type: "亚洲料理",
      foods: [
        "寿司",
        "日料定食",
        "豚骨拉面",
        "乌冬面",
        "蛋包饭"
      ]
    },
    韩餐: {
      type: "亚洲料理",
      foods: [
        "韩式炸鸡",
        "韩式拌饭",
        "石锅拌饭",
        "部队锅"
      ]
    },
    泰餐: {
      type: "东南亚",
      foods: [
        "冬阴功",
        "泰式炒河粉",
        "咖喱鸡",
        "泰式菠萝饭"
      ]
    },
    西餐: {
      type: "西式",
      foods: [
        "披萨",
        "意大利面",
        "牛排",
        "汉堡",
        "三明治"
      ]
    },
    轻食: {
      type: "健康",
      foods: [
        "沙拉轻食",
        "轻食碗",
        "鸡胸肉沙拉",
        "牛油果沙拉"
      ]
    },
    小吃夜宵: {
      type: "小吃",
      foods: [
        "生煎包",
        "锅贴煎饺",
        "煎饼果子",
        "烤冷面",
        "奶茶+小吃",
        "夜宵大排档"
      ]
    },
    甜品饮品: {
      type: "甜点",
      foods: [
        "双皮奶",
        "杨枝甘露",
        "红豆汤",
        "奶茶",
        "水果捞"
      ]
    }
  };

  const [results, setResults] = React.useState([]);
  const [count, setCount] = React.useState(3);
  const [clickCount, setClickCount] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [usedMessages, setUsedMessages] = React.useState<string[]>([]);
  const [isBouncing, setIsBouncing] = React.useState(false);

  const funnyMessages = [
    "实在不知道吃什么，就别难为自己了",
    "建议直接去厨房自己发挥",
    "AI 检测到：你们并不是真的饿",
    "要不睡觉吧，睡着就不饿了",
    "不吃了，修仙"
  ];

  const easterEggs = {
    7: "再给你们一次机会",
    9: "建议直接吃上一顿剩下的",
    12: "我累了，你们自己看着办吧"
  };

  const generateFoods = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (newClickCount > 5) {
      const availableMessages = funnyMessages.filter(
        (msg) => !usedMessages.includes(msg)
      );

      if (availableMessages.length > 0) {
        const randomMessage =
          availableMessages[
            Math.floor(Math.random() * availableMessages.length)
          ];

        setMessage(randomMessage);
        setIsBouncing(true);

        setTimeout(() => {
          setIsBouncing(false);
        }, 5000);
        setUsedMessages((prev) => [...prev, randomMessage]);
      }
    }

    if (easterEggs[newClickCount]) {
      setMessage(easterEggs[newClickCount]);
      setIsBouncing(true);

      setTimeout(() => {
        setIsBouncing(false);
      }, 5000);
    }
    const cuisineNames = Object.keys(cuisineData);

    const shuffledCuisine = [...cuisineNames].sort(
      () => Math.random() - 0.5
    );

    const selectedCuisine = shuffledCuisine.slice(0, count);

    const generated = selectedCuisine.map((cuisine) => {
      const cuisineInfo = cuisineData[cuisine];
      const shuffledFoods = [...cuisineInfo.foods].sort(
        () => Math.random() - 0.5
      );

      const recommendedFoods = shuffledFoods.slice(0, 3);

      return {
        cuisine,
        type: cuisineInfo.type,
        foods: recommendedFoods
      };
    });

    setResults(generated);
  };

  React.useEffect(() => {
    generateFoods();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">今晚吃什么 🍜</h1>
          <p className="text-gray-500 text-lg">
            随机帮你们挑选晚饭灵感
          </p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <span className="text-gray-700 font-medium">生成数量：</span>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="border rounded-xl px-4 py-2"
          >
            <option value={1}>1 个</option>
            <option value={2}>2 个</option>
            <option value={3}>3 个</option>
            <option value={5}>5 个</option>
          </select>
        </div>

        <button
          onClick={generateFoods}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl text-lg transition-all duration-200 shadow-lg hover:scale-[1.02]"
        >
          🎲 随机生成晚饭选项
        </button>

        {message && (
          <div className={`mt-6 relative overflow-hidden rounded-3xl border-2 border-orange-300 bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 p-1 shadow-2xl ${isBouncing ? "animate-bounce" : ""}` }>
            <div className="bg-white/90 backdrop-blur-sm rounded-[22px] px-6 py-5 text-center">
              <div className="text-4xl mb-2">⚠️</div>
              <div className="text-2xl font-black text-orange-600 leading-relaxed tracking-wide">
                {message}
              </div>
              <div className="mt-3 text-sm text-gray-500">
                第 {clickCount} 次纠结中...
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-red-300/30 rounded-full blur-2xl" />
          </div>
        )}

        <div className="mt-8 grid gap-4">
          {results.map((item, index) => (
            <div
              key={index}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm bg-orange-200 text-orange-800 px-3 py-1 rounded-full font-medium">
                  {item.type}
                </span>
                <span className="text-sm text-gray-500">
                  {item.cuisine}
                </span>
              </div>

              <div className="text-center">
                <div className="text-lg text-gray-500 mb-2">
                  推荐菜系
                </div>
                <div className="text-3xl font-bold mb-4">
                  {item.cuisine}
                </div>

                <div className="text-lg text-gray-500 mb-2">
                  推荐吃
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-3">
                  {item.foods.map((food, foodIndex) => (
                    <div
                      key={foodIndex}
                      className="bg-white border border-orange-200 text-orange-600 px-4 py-2 rounded-full text-lg font-semibold shadow-sm"
                    >
                      {food}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm text-gray-400 text-center">
          实在选不出来的话，可以默认选第一个 😄
        </div>
      </div>
    </div>
  );
}
