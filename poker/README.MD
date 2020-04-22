
<!DOCTYPE html>
<html>

<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">


<body>

<h1 id="toc_0">Game #1 - Poker</h1>

<p>Provided:</p>

<ul>
<li>There are 52 cards in a deck and 2 players - Leon &amp; Judy</li>
<li>Each player will take a hand of 5 cards from the same deck</li>
<li>A number is assigned for each rank (table 1)</li>
</ul>

<table>
<thead>
<tr>
<th>A</th>
<th>2</th>
<th>3</th>
<th>4</th>
<th>5</th>
<th>6</th>
<th>7</th>
<th>8</th>
<th>9</th>
<th>10</th>
<th>J</th>
<th>Q</th>
<th>K</th>
</tr>
</thead>

<tbody>
<tr>
<td>1</td>
<td>2</td>
<td>3</td>
<td>4</td>
<td>5</td>
<td>6</td>
<td>7</td>
<td>8</td>
<td>9</td>
<td>10</td>
<td>10</td>
<td>10</td>
<td>10</td>
</tr>
</tbody>
</table>

<ul>
<li>The score of a hand is calculated with the steps below

<ol>
<li>Identify 3 cards in 5 whose sum is divisible by 10</li>
<li>If such 3-cards group can be identified, the score of 5-cards group is the sum of 2 rest cards if the sum is not greater than 10, or else it is the sum minus 10.</li>
<li>If such 3-cards group can not be identified, the score is 0</li>
<li>e.g score(J, Q, K, 5, 8) = 3, score(2, Q, K, 5, 3) = 10, score(A, 2, 3, 4, A) = 0, score(5, 6, 10, 9, 3) = 3</li>
</ol></li>
<li>If Leon&#39;s score is higher than Judy&#39;s then Leon beats Judy and vice visa</li>
<li>If Leon&#39;s score equals Judy&#39;s then their highest rank will be compared in ascending order described in table 1 above. Therefore, hand (J, Q, K, 5, 8) beats (5, 6, 10, 9, 3)</li>
<li>If the scores and the highest ranks of two hands both equal then the suits of cards with the highest rank will be compared in order spade(S) &gt; heart(H) &gt; club(C) &gt; diamond(D). Therefore, &quot;H9S7CAC2D7&quot; (heart 9, spade 7, club A, club 2 and diamond 7) beats &quot;D9D5C6S5DA&quot;.</li>
<li>I made a record for every game they played that day in format &#39;&lt;Leon&#39;s hand&gt;;&lt;Judy&#39;s hand&gt;&#39; (e.g &quot;H9S7CAC2D7;D9D5C6S5DA&quot;). But they played so many times that I was totally lost. Could you please help me find out who won more?</li>
</ul>

<p>Please write a program to generate two files - leon.txt for Leon&#39;s winning records and judy.txt for Judy&#39;s (the order of lines must be kept).</p>

<p>I tried my best to keep the correctness of my record but feel free to skip it if you find any game that doesn&#39;t make sense.</p>

<p>You may download my record at <a href="https://b1.rippletek.com/games/LJ-poker.txt">here</a>.</p>

<p>For your quick verification, the first 3 lines of leon.txt should be:</p>

<div><pre><code class="language-none">C9D7D9S7D2;HAC5S8D8C10
DQSJD8C4DA;H3C9H7D6S2
S5HAHJS9DQ;D3S7C6D6S3</code></pre></div>

<p>Thank you!</p>

<hr>

<p>Please send your code (test code must be provided as well) to code@rippletek.com</p>




</body>

</html>
