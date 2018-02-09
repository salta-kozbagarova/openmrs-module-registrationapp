package org.openmrs.module.registrationapp.fragment.controller.field;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.openmrs.Concept;
import org.openmrs.ConceptAnswer;
import org.openmrs.api.context.Context;
import org.openmrs.ui.framework.annotation.FragmentParam;
import org.openmrs.ui.framework.fragment.FragmentModel;
import org.openmrs.util.LocaleUtility;

public class ConceptFragmentController {

	public void controller(FragmentModel model, @FragmentParam(value = "conceptId") Concept concept) throws Exception {
		Collection<Map<String, String>> collection = new ArrayList<Map<String, String>>();
		
		if(concept == null){
			Map<String, String> tmp = new HashMap<String, String>();
			String fullname = "Test";
			tmp.put("label", fullname);
			tmp.put("value", fullname);
			collection.add(tmp);
			model.put("conceptAnswers", collection);
			tmp = new HashMap<String, String>();
			fullname = "Тест";
			tmp.put("label", fullname);
			tmp.put("value", fullname);
			collection.add(tmp);
			model.put("conceptAnswers", collection);
		} else{
			
			Map<String, String> conceptMap;
			Locale locale = LocaleUtility.getDefaultLocale();
			
			Collection<ConceptAnswer> conceptAnswers = concept.getAnswers();
			
			for (ConceptAnswer conceptAnswer : conceptAnswers) {
				conceptMap = new HashMap<String, String>();
				String fullname = conceptAnswer.getAnswerConcept().getFullySpecifiedName(locale).getName();
				conceptMap.put("label", fullname);
				conceptMap.put("value", fullname);
				collection.add(conceptMap);
			}
			Map<String, String> tmp = new HashMap<String, String>();
			String fullname = "Test concept created";
			tmp.put("label", fullname);
			tmp.put("value", fullname);
			collection.add(tmp);
			tmp = new HashMap<String, String>();
			fullname = "Тест концепт создан";
			tmp.put("label", fullname);
			tmp.put("value", fullname);
			collection.add(tmp);
			tmp = new HashMap<String, String>();
			fullname = "Тест концепт "+concept.getDisplayString()+" "+concept.getUuid()+" "+concept.getId()+" "+locale+" "+concept.getAnswers().size();
			tmp.put("label", fullname);
			tmp.put("value", fullname);
			collection.add(tmp);
			model.put("conceptAnswers", collection);
			model.put("conceptAnswers", collection);
		}
	}
}
