/**
 * Creates fake file interface for Emmet actions
 */
import EmmetCodemirror from 'emmet-codemirror';
var emmet = EmmetCodemirror.emmet;
var demoImage = atob('iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAB0UlEQVQ4y2P4z8DAQCoGgjwgVsIqR46BwoJMt7i5GPeBmFQxUFWR5R6IycHOuB5Ii6C5niENiDORcAVID5ICDSCOB+IGIO4G4lwBPqY3MDOAhq5DNhTDkYL8TE+jArgcgGwWIC5iZ2O8TsjRnByMa4G0ENhARkaGf6JCTJ/rCviOg/DeFaKdz85IibCyMM4lJSSALl0Ld6GCDMszoCEaUMzFwszQSmrQ8nIzfgDqFQcbKC3B/BQpDFT4+Zieo2vg4mT8KSLE9AUYuz+BvkKRk5Vi/jC7S2gp0EApsIEykszPYLJaaqwZbGyMv0BckOYwH64r2xeJrrm0S2IGEPcC8TQ1JZZXMMM0VVhfbVsk2g80TAKIGTEM1NdinQliApPGmyWThJcDFXkDMQ+yk+SkmB+AmBZGbI9ObBKvAcpzo8QysoHGemwbgAofn9sGViiGLcCALrzrYMl+7+EJyRSgGmb0dIhiYGsZf+XRdWL5QIVMuGKgvpBvzp3DkvFQA3zwGggKWCBmxRelQHkVqOZ2YPL6iGGgvDTzYzILif+SYszvUcSYmRj+AnPDdyBzM6kYlHzERZnfYLiQEgwsed6hGAgMj/lADEqUK8jAS4C4A9lAAFHbei84vFYeAAAAAElFTkSuQmCC');

emmet.file({
	read(path, callback) {
		if (typeof callback === 'function') {
			callback(0, demoImage);
		}

		return demoImage;
	},
	
	locateFile(editorFile, fileName) {
		return fileName;
	},
	
	createPath(parent, fileName) {
		return fileName;
	},
	
	save(file, content) {
		
	},
	
	getExt(file) {
		var m = (file || '').match(/\.([\w\-]+)$/);
		return m ? m[1].toLowerCase() : '';
	}
});

// update getImageSize() method to produce fake size
// for demo image
emmet.utils.action.getImageSize = () => {
	return {width: 200, height: 150}
};