package org.openmrs.module.registrationapp.fragment.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Pattern;

import org.openmrs.Concept;
import org.openmrs.ConceptAnswer;
import org.openmrs.api.ConceptService;
import org.openmrs.module.registrationapp.RegistrationAppUtils;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.util.LocaleUtility;
import org.springframework.web.bind.annotation.RequestParam;

public class ConceptFragmentController {

	public Collection<Map<String, ? extends Object>> getConcepts(
			@SpringBean("conceptService") ConceptService conceptService,
			@RequestParam(value = "term", required = true) String searchPhrase,
			@RequestParam(value = "conceptId", required = true) String conceptId,
			@RequestParam(value = "maxResults", required = false) String maxResults){
		
		Concept concept = RegistrationAppUtils.getConcept(conceptId, conceptService);
		Collection<Map<String, ? extends Object>> collection = new ArrayList<Map<String,? extends Object>>();
		Map<String, Object> conceptMap;
		Locale locale = Locale.ENGLISH;
		if(Pattern.matches(".*\\p{InCyrillic}.*", searchPhrase)){
			locale = new Locale("ru");
		}
		
		Collection<ConceptAnswer> conceptAnswers = concept.getAnswers();
		int answersSize = conceptAnswers.size();
		int resultCount=0;
		maxResults = (maxResults==null || maxResults.isEmpty()) ? "20" : maxResults;
		
		//Checking if the concepts should be autocomplete or returned fully as a dropDown
		//if concept answers size is less than maxresults then it is dropDown
		boolean isDropDown = answersSize<=Integer.parseInt(maxResults);
				
		for (ConceptAnswer conceptAnswer : conceptAnswers) {
			if(isDropDown != true && resultCount==Integer.parseInt(maxResults)){
				break;
			}
			conceptMap = new HashMap<String, Object>();
			String fullname = conceptAnswer.getAnswerConcept().getFullySpecifiedName(locale).getName();
			if(isDropDown != true && !fullname.toLowerCase().contains(searchPhrase.toLowerCase())){
				continue;
			}
			conceptMap.put("label", fullname);
			conceptMap.put("value", fullname);
			collection.add(conceptMap);
			resultCount++;
		}
		
		return collection;
	}
}
