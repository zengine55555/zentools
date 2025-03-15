<script>
        let index = 0;
        let scores = { E: 3, I: 3, N: 3, S: 3, T: 3, F: 3, J: 3, P: 3 };

        let questions = [
            { 
                text: "Do you enjoy being alone or with friends?", 
                trait: ["E", "I"],
                options: ["I love being alone!", "I mostly prefer being alone", "I like both alone and with people", "I mostly prefer being with people", "I love spending time with people!"]
            },
            { 
                text: "Do you focus more on facts or future possibilities?", 
                trait: ["S", "N"],
                options: ["Only facts matter!", "I mostly rely on facts", "I balance both facts and future", "I mostly think about future possibilities", "I only think about the future!"]
            },
            { 
                text: "Do you make decisions based on logic or emotions?", 
                trait: ["T", "F"],
                options: ["I only think logically", "I mostly use logic", "I use both logic and feelings", "I mostly go with feelings", "I always trust my emotions!"]
            },
            { 
                text: "Do you plan things or go with the flow?", 
                trait: ["J", "P"],
                options: ["I always plan!", "I mostly plan", "I balance planning and flexibility", "I mostly go with the flow", "I do things whenever I feel like!"]
            }
        ];

        function loadQuestion() {
            let q = questions[index];
            document.getElementById("question").textContent = q.text;

            let optionsContainer = document.getElementById("options");
            optionsContainer.innerHTML = "";

            q.options.forEach((text, idx) => {
                let button = document.createElement("button");
                button.textContent = text;
                button.onclick = () => answer(idx + 1);
                optionsContainer.appendChild(button);
            });
        }

        function answer(value) {
            scores[questions[index].trait[0]] += value > 3 ? 1 : 0;
            scores[questions[index].trait[1]] -= value < 3 ? 1 : 0;
            index++;
            document.getElementById("progress").style.width = ((index / questions.length) * 100) + "%";

            if (index < questions.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }

        function showResult() {
            let description = "";
            if (scores.E > scores.I) description += "You are outgoing and energetic. ";
            else description += "You enjoy quiet and deep thinking. ";

            if (scores.N > scores.S) description += "You love exploring new ideas. ";
            else description += "You focus on real-world facts. ";

            if (scores.T > scores.F) description += "You make decisions with logic. ";
            else description += "You make decisions based on feelings. ";

            if (scores.J > scores.P) description += "You like being organized and planned. ";
            else description += "You enjoy flexibility and freedom. ";

            let finalScore = `I${scores.I}S${scores.S}T${scores.T}P${scores.P}`;

            document.querySelector(".container").style.display = "none";
            document.getElementById("result").style.display = "block";
            document.getElementById("result-message").textContent = description;
            document.getElementById("mbti-score").textContent = `Your MBTI Score: ${finalScore}`;
        }

        loadQuestion();
    </script>
