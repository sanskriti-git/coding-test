function findFirstAndSecondLongestConcatenatedWords(words) {
    words.sort((a, b) => b.length - a.length);
    let firstLongestConcatenatedWord = '';
    let secondLongestConcatenatedWord = '';
    let foundFirstLongest = false;
  
    const isConcatenated = (word, dictionary) => {
      if (dictionary.has(word)) return true;
      for (let i = 1; i < word.length; i++) {
        const prefix = word.slice(0, i);
        const suffix = word.slice(i);
        if (dictionary.has(prefix) && isConcatenated(suffix, dictionary)) {
          return true;
        }
      }
      return false;
    };
  
    const wordSet = new Set(words);
    for (const word of words) {
      wordSet.delete(word); 
      if (isConcatenated(word, wordSet)) {
        if (!foundFirstLongest) {
          firstLongestConcatenatedWord = word;
          foundFirstLongest = true;
        } else {
          if (word.length > secondLongestConcatenatedWord.length) {
            secondLongestConcatenatedWord = word;
          }
        }
      }
      wordSet.add(word);
    }
  
    return { firstLongest: firstLongestConcatenatedWord, secondLongest: secondLongestConcatenatedWord };
  }
  
  const words = ["cat", "cats", "catsdogcats", "dog", "dogcatsdog", "hippopotamuses", "rat", "ratcatdogcat"];
  const { firstLongest, secondLongest } = findFirstAndSecondLongestConcatenatedWords(words);
  console.log("FirstLongest Concatenated Word:", firstLongest);
  console.log("Second Longest Concatenated Word:", secondLongest);
  