document.querySelector(".card-container").style.display = 'none';
        let isopen = false;
        let prevnum;
        let samenumc = 0;
        let prevclicked;
        const characters = {
            "0": {
                name: "Benjamin Martin",
                description: "While Benjamin Martin is a fictional character, he is based on a composite of historical characters which include Francis Marion (as pictured).",
                image: "francis.png"
            },
            "1": {
                name: "Colonel Tavington",
                description: "Colonel Tavington was a fictional character in the Mel Gibson movie 'The Patriot'. Colonel Tavington was, however, based on a real officer from that time, one Colonel Sir Banastre Tarleton (as pictured), an English cavalry commander.",
                image: "banastre.jpg"
            },
            "2": {
                name: "General Cornwallis",
                description: "General Charles Cornwallis is the overarching antagonist of the 2000 historical war film The Patriot. He is a leading General of the British Army in the American Revolution and the commanding officer of Colonel William Tavington.",
                image: "corn.jpg"
            },
            "3": {
                name: "Jean Villeneuve",
                description: "A French officer who assists the American militia in the film. He is a fictional character, but he represents the real involvement of the French forces during the American Revolutionary War. Jean Villeneuve symbolizes the critical French alliance that contributed to American success in the war, especially at the Battle of Yorktown.",
                image: "patriot.jpg"
            },
            "4": {
                name: "Harry Burwell",
                description: "Based on General Nathanael Greene, a real American officer who played a key role in the southern campaigns of the Revolutionary War. While 'Colonel Harry Burwell' is a fictionalized version, his military strategies and leadership qualities are inspired by the real Nathanael Greene, one of George Washington's most trusted generals.",
                image: "patriot.jpg"
            },
            "5": {
                name: "Occam",
                description: "A freed slave who joins Benjamin Martin's militia in exchange for freedom. He represents African Americans who fought in the Revolutionary War. Occam’s character serves as a reminder of the role that African American soldiers played in the war, many of whom fought for the promise of freedom.",
                image: "patriot.jpg"
            }
        };
        const bubbles = document.querySelectorAll(".bubble")
        bubbles.forEach(function(x){
            x.addEventListener("click",function(){
                card.style.display = 'block';
                document.querySelector(".card-container").style.display = 'block';
                let idx = Array.from(bubbles).indexOf(x)
                card.classList.add("show"); // Add show class for fade-in
                if(Array.from(bubbles).includes(prevclicked)){
                    document.querySelector(".card-text").classList.add("hidden")
                    document.querySelector(".card-title").classList.add("hidden")
                    document.querySelector(".card-image").classList.add("hidden")
                    setTimeout(() => {
                        document.querySelector(".card-text").classList.remove("hidden")
                        document.querySelector(".card-title").classList.remove("hidden")
                        document.querySelector(".card-image").classList.remove("hidden")
                        document.querySelector(".card-text").classList.add("show")
                        document.querySelector(".card-title").classList.add("show")
                        document.querySelector(".card-image").classList.add("show")
                        document.querySelector(".card-title").textContent = characters[idx].name
                        document.querySelector(".card-text").textContent = characters[idx].description
                        document.querySelector(".card-image").src = characters[idx].image
                        setTimeout(() => {
                            document.querySelector(".card-text").classList.remove("show")
                            document.querySelector(".card-title").classList.remove("show")
                            document.querySelector(".card-image").classList.remove("show")
                        }, 300); // Match this timeout with the duration of fade-out
                    },300);
                }else{
                    document.querySelector(".card-text").classList.add("show")
                    document.querySelector(".card-title").classList.add("show")
                    document.querySelector(".card-image").classList.add("show")
                    document.querySelector(".card-title").textContent = characters[idx].name
                    document.querySelector(".card-text").textContent = characters[idx].description
                    document.querySelector(".card-image").src = characters[idx].image
                    setTimeout(() => {
                    document.querySelector(".card-text").classList.remove("show")
                    document.querySelector(".card-title").classList.remove("show")
                    document.querySelector(".card-image").classList.remove("show")

                }, 300); // Match this timeout with the duration of fade-out
                }
                
               

            })
        })
        function moveup(number){
            isopen = false;
            document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                if(parseInt(dropdown.parentElement.getAttribute("id").split('d')[1]) > number){
                    dropdown.parentElement.style.transform = "translateY(0)"
                }
            })
        }
        function movedown(number){
            isopen = true;
            document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                if(parseInt(dropdown.parentElement.getAttribute("id").split('d')[1]) > number){
                    dropdown.parentElement.style.transform = "translateY(14vh)"
                }
            })
        }
        function toggleDropdown(number) {
            const dropdownContent = document.getElementById('dropdown' + number);

            var samebuttonflag = false;
            // Close other dropdowns
            if(number == prevnum){
                samebuttonflag = true;
                samenumc +=1
            }else{
                samenumc = 0
            }
            document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                
                if (dropdown !== dropdownContent) {
                    dropdown.style.display = 'none';
                }
                dropdown.parentElement.querySelector(".arrow").style.transform = "rotate(90deg)";
            });
            moveup(prevnum)
            if (samenumc % 2 == 0){
                movedown(number)
            }
            
            // Toggle current dropdown
            if (dropdownContent.style.display === 'block') {
                dropdownContent.style.animation = 'fadeSlideUp .5s forwards'
                        setTimeout(function(){
                        dropdownContent.style.display = 'none';
                    },500)
            } else {
                dropdownContent.parentElement.querySelector(".arrow").style.transform = "rotate(0deg)";
                dropdownContent.style.display = 'block';
                dropdownContent.style.animation = 'fadeSlideDown 0.5s forwards'; // Apply animation
            }
            prevnum = number;
        }

        // Close dropdown when clicking outside of it
        window.onclick = function(event) {
            prevclicked = event.target;
            if (!event.target.matches('.dropdown button')) {

                moveup(prevnum)
                samenumc +=1;
                document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                    if (dropdown.style.display != 'none'){
                        dropdown.parentElement.querySelector(".arrow").style.transform = "rotate(90deg)";
                        dropdown.style.animation = 'fadeSlideUp .5s forwards'
                        setTimeout(function(){
                        dropdown.style.display = 'none';
                    },500)
                    }
                    
                });
            }
            if(!event.target.matches(".bubble") && !event.target.className.includes("card") && !event.target.parentElement.parentElement.className.includes("bubble") && !event.target.parentElement.className.includes("bubble")){
                card.classList.add("hide"); // Add hide class to fade out
            setTimeout(() => {
                card.classList.remove("show", "hide"); // Reset classes after animation
                card.style.display = "none"; // Hide the card after animation
            }, 500); // Match this timeout with the duration of fade-out

            }
        }
        let lastclicked;
        function showPage(pageNumber) {
            if( document.getElementById('page' + pageNumber) == lastclicked){
                return;
            }
            samenumc = 0;
            if(lastclicked){
                lastclicked.classList.add("outro-animation");
            }
            
            setTimeout(function(){
                const pages = document.querySelectorAll('.main-content');
            pages.forEach(page => {
                page.style.display = "none";
                
            });
            if (lastclicked){
                lastclicked.classList.remove("outro-animation");
            }
                lastclicked = document.getElementById('page' + pageNumber); 
                document.getElementById('page' + pageNumber).style.display = "block";
                lastclicked.classList.add("intro-animation");
                setTimeout(function(){
                lastclicked.classList.remove("intro-animation");
                }, 500)
            }, 450)
            
            
        }

        // Show the first page by default
        showPage(1);