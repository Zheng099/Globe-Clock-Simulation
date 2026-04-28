[index.html](https://github.com/user-attachments/files/27148156/index.html)
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2299.77">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 18.0px 0.0px; font: 14.4px 'PingFang SC Semibold'; color: #2a9cf3; background-color: #000000; background-color: rgba(0, 0, 0, 0)}
    span.s1 {font: 14.4px 'PingFang SC'; font-kerning: none}
  </style>
</head>
<body>
<p class="p1"><span class="s1"><b>&lt;!DOCTYPE html&gt;</b></span></p>
<p class="p1"><span class="s1"><b>&lt;html lang="zh-TW"&gt;</b></span></p>
<p class="p1"><span class="s1"><b>&lt;head&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">    </span>&lt;meta charset="UTF-8"&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">    </span>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">    </span>&lt;title&gt;地球儀時鐘 - 力學診斷 App&lt;/title&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">    </span>&lt;style&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">        </span>body { font-family: sans-serif; background: #0f172a; color: #f8fafc; display: flex; flex-direction: column; align-items: center; padding: 40px; margin: 0; }</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">        </span>.app-container { display: flex; gap: 40px; background: #1e293b; padding: 35px; border-radius: 24px; box-shadow: 0 25px 50px rgba(0,0,0,0.5); border: 1px solid #334155; max-width: 1000px; }</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">        </span>.visualizer { width: 300px; height: 300px; border-radius: 50%; border: 4px solid #38bdf8; display: flex; align-items: center; justify-content: center; position: relative; background: radial-gradient(circle, #1e40af, #0f172a); }</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">        </span>.hand { position: absolute; width: 100%; height: 4px; background: #fb7185; transform-origin: center; box-shadow: 0 0 15px #fb7185; }</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">        </span>.controls { width: 280px; }</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">        </span>.dashboard { width: 300px; background: #020617; padding: 20px; border-radius: 15px; border-left: 6px solid #38bdf8; }</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">        </span>input[type=range] { width: 100%; margin: 15px 0; cursor: pointer; }</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">    </span>&lt;/style&gt;</b></span></p>
<p class="p1"><span class="s1"><b>&lt;/head&gt;</b></span></p>
<p class="p1"><span class="s1"><b>&lt;body&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">    </span>&lt;h1 style="color:#38bdf8"&gt;🌍 地球儀時鐘：設計工學模擬&lt;/h1&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">    </span>&lt;div class="app-container"&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">        </span>&lt;div class="visualizer"&gt;&lt;div class="hand" id="hand"&gt;&lt;/div&gt;&lt;div style="z-index:10"&gt;核心軸點&lt;/div&gt;&lt;/div&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">        </span>&lt;div class="controls"&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>&lt;h3&gt;參數調整&lt;/h3&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>&lt;label&gt;重量: &lt;span id="mVal"&gt;2.0&lt;/span&gt; kg&lt;/label&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>&lt;input type="range" id="mass" min="0.5" max="10" step="0.1" value="2.0"&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>&lt;label&gt;轉速: &lt;span id="sVal"&gt;15&lt;/span&gt;&lt;/label&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>&lt;input type="range" id="speed" min="1" max="100" value="15"&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">        </span>&lt;/div&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">        </span>&lt;div class="dashboard"&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>&lt;h3&gt;力學數據&lt;/h3&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>&lt;p&gt;扭矩: &lt;span id="torsion"&gt;0&lt;/span&gt; N-mm&lt;/p&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>&lt;p&gt;衝擊力: &lt;span id="impact"&gt;0&lt;/span&gt; N&lt;/p&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>&lt;p id="status" style="color:#10b981; font-weight:bold;"&gt;✅ 運作安全&lt;/p&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">        </span>&lt;/div&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">    </span>&lt;/div&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">    </span>&lt;script&gt;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">        </span>const hand = document.getElementById('hand');</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">        </span>let angle = 0;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">        </span>function run() {</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>const m = document.getElementById('mass').value;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>const s = document.getElementById('speed').value;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>document.getElementById('mVal').innerText = m;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>document.getElementById('sVal').innerText = s;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>angle = (angle + s/10) % 360;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>hand.style.transform = `rotate(${angle}deg)`;</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>document.getElementById('torsion').innerText = (m * 9.8 * 1.5 * s).toFixed(2);</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>document.getElementById('impact').innerText = (m * 25).toFixed(2);</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">            </span>requestAnimationFrame(run);</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">        </span>}</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">        </span>run();</b></span></p>
<p class="p1"><span class="s1"><b><span class="Apple-converted-space">    </span>&lt;/script&gt;</b></span></p>
<p class="p1"><span class="s1"><b>&lt;/body&gt;</b></span></p>
<p class="p1"><span class="s1"><b>&lt;/html&gt;</b></span></p>
</body>
</html>
