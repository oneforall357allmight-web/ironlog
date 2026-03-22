import { useState, useEffect, useRef, useCallback, useMemo } from "react";

/* ═══════════════════════════════════════════
   IRONLOG — Premium Gym Tracker + Social
   Aesthetic: Matte black luxury / warm amber
   ═══════════════════════════════════════════ */

// ── SVG Icons (replacing emojis) ──
const I = {
  dashboard: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  routines: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>,
  workout: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M2 12h3l2-3 3 8 3-5h3"/><path d="M18 12h4"/><path d="M17.5 8V4"/><path d="M20.5 8V4"/><path d="M16 6h6"/><path d="M17.5 20v-4"/><path d="M20.5 20v-4"/><path d="M16 18h6"/></svg>,
  hub: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  settings: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  x: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  plus: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  heart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  heartFill: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  comment: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  camera: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  image: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  timer: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  trash: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  edit: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  send: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  arrow: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  user: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  fire: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 12c0-3 2.5-6 2.5-6S17 9 17 12a5 5 0 1 1-10 0c0-3 2.5-6 2.5-6S12 9 12 12z"/></svg>,
  chart: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  target: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  clock: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
};

// ── i18n (condensed) ──
const T={en:{appName:"IRONLOG",tagline:"TRACK · ANALYZE · DOMINATE",login:"Sign In",register:"Create Account",email:"Email",username:"Username",password:"Password",confirmPassword:"Confirm Password",logout:"Sign Out",forgotPassword:"Forgot password?",resetPassword:"Reset Password",resetInstructions:"Enter the email you registered with",newPassword:"New Password",resetSuccess:"Password reset successfully.",resetError:"No account found with that email.",backToLogin:"Back to Sign In",sendReset:"Reset",dashboard:"Dashboard",routines:"Routines",workout:"Workout",hub:"Community",settings:"Settings",startWorkout:"Start Workout",finishWorkout:"Finish Workout",cancelWorkout:"Cancel",addExercise:"Add Exercise",addSet:"Add Set",weight:"Weight",reps:"Reps",set:"Set",sets:"Sets",rest:"Rest",restTimer:"Rest Timer",skip:"Skip",lbs:"lbs",kg:"kg",mins:"min",seconds:"sec",save:"Save",delete:"Delete",edit:"Edit",cancel:"Cancel",create:"Create",name:"Name",search:"Search exercises...",noResults:"No exercises found",monday:"Monday",tuesday:"Tuesday",wednesday:"Wednesday",thursday:"Thursday",friday:"Friday",saturday:"Saturday",sunday:"Sunday",chest:"Chest",back:"Back",shoulders:"Shoulders",biceps:"Biceps",triceps:"Triceps",core:"Core",cardio:"Cardio",other:"Other",createRoutine:"Create Routine",editRoutine:"Edit Routine",routineName:"Routine Name",assignDay:"Assign Day",restTimerDefault:"Rest Timer",selectExercises:"Select Exercises",noRoutines:"No routines yet. Create your first.",workoutComplete:"Session Complete",analysisTitle:"Analysis",totalVolume:"Total Volume",totalSets:"Total Sets",musclesWorked:"Muscles Hit",duration:"Duration",restCompliance:"Rest Discipline",overallGrade:"Grade",strengths:"Strengths",improvements:"To Improve",tips:"Next Session",monthlyOverview:"Monthly",weeklyOverview:"Weekly",workoutsCompleted:"Sessions",mostTrained:"Most Trained",volumeTrend:"Volume Trend",progressiveOverload:"Progressive Overload",lastSession:"Last",personalBest:"PR",prevWeights:"Previous",noHistory:"No history yet. Complete your first workout.",tooMuchRest:"Too much rest. Move.",restWarning:"Over by",goodRest:"Good rest",addCustomExercise:"Add Custom Exercise",exerciseName:"Exercise Name",muscleGroup:"Muscle Group",customExercises:"Custom Exercises",language:"Language",welcomeBack:"Welcome back",todayRoutine:"Today's Routine",noRoutineToday:"No routine for today",recentWorkouts:"Recent",emptyWorkout:"Empty Workout",restBetweenSets:"Rest Between Sets",criticalMode:"Critical Mode",criticalModeDesc:"Alerts when resting too long",on:"ON",off:"OFF",primaryMuscles:"Primary Muscles",volume:"Volume",selectRoutine:"Select a routine",muscleHeatmap:"Muscle Map",allTime:"All Time",thisMonth:"This Month",thisWeek:"This Week",glutes:"Glutes",hamstrings:"Hamstrings",quads:"Quads",calves:"Calves",forearms:"Forearms",abs:"Abs",lowerBack:"Lower Back",upperBack:"Upper Back",lats:"Lats",traps:"Traps",rearDelts:"Rear Delts",frontDelts:"Front Delts",sideDelts:"Side Delts",upperChest:"Upper Chest",midChest:"Mid Chest",lowerChest:"Lower Chest",analysis_excellent:"Outstanding discipline. You earned this.",analysis_good:"Solid work. Room to push harder.",analysis_average:"You showed up. Now show up stronger.",analysis_poor:"Tough one. Reset and come back better.",analysis_rest_good:"Rest times on point. Discipline wins.",analysis_rest_bad:"Too many long breaks. Tighten up.",analysis_volume_high:"High volume — recover well tonight.",analysis_volume_low:"Low volume. Add sets next time.",analysis_tip_progressive:"Add 2.5-5 lbs to main lifts next session.",analysis_tip_rest:"Respect the timer. Every second counts.",analysis_tip_form:"Can't finish reps? Drop weight, perfect form.",analysis_tip_consistency:"Show up tomorrow. That's the whole secret.",socialHub:"Community",shareWorkout:"Share",postWorkout:"Post Workout",writeCaption:"Write something...",post:"Publish",takePhoto:"Camera",uploadPhoto:"Gallery",includeRoutine:"Include routine",includeDashboard:"Include stats",includeExercises:"Include exercises",noPostsYet:"No posts yet. Be the first.",follow:"Follow",following:"Following",unfollow:"Unfollow",feedAll:"Everyone",feedFollowing:"Following",like:"Like",liked:"Liked",writeComment:"Add a comment...",comments:"Comments",justNow:"now",minutesAgo:"m",hoursAgo:"h",daysAgo:"d",exercises:"Exercises",passwordMismatch:"Passwords don't match",emailRequired:"Email required",emailTaken:"Email already in use",invalidEmail:"Invalid email",usernameTaken:"Username taken",fillAllFields:"Fill in all fields",invalidCredentials:"Invalid credentials",memberSince:"Member since",deletePost:"Delete post",deleteComment:"Delete",confirmDelete:"Are you sure?",yes:"Yes",no:"No"},
fr:{appName:"IRONLOG",tagline:"SUIVRE · ANALYSER · DOMINER",login:"Connexion",register:"Créer un compte",email:"Courriel",username:"Nom d'utilisateur",password:"Mot de passe",confirmPassword:"Confirmer",logout:"Déconnexion",forgotPassword:"Mot de passe oublié?",resetPassword:"Réinitialiser",resetInstructions:"Entrez le courriel utilisé à l'inscription",newPassword:"Nouveau mot de passe",resetSuccess:"Mot de passe réinitialisé.",resetError:"Aucun compte avec ce courriel.",backToLogin:"Retour",sendReset:"Réinitialiser",dashboard:"Tableau",routines:"Routines",workout:"Entraînement",hub:"Communauté",settings:"Paramètres",startWorkout:"Commencer",finishWorkout:"Terminer",cancelWorkout:"Annuler",addExercise:"Ajouter exercice",addSet:"Ajouter série",weight:"Poids",reps:"Reps",set:"Série",sets:"Séries",rest:"Repos",restTimer:"Minuteur",skip:"Passer",lbs:"lbs",kg:"kg",mins:"min",seconds:"sec",save:"Sauvegarder",delete:"Supprimer",edit:"Modifier",cancel:"Annuler",create:"Créer",name:"Nom",search:"Rechercher...",noResults:"Aucun résultat",monday:"Lundi",tuesday:"Mardi",wednesday:"Mercredi",thursday:"Jeudi",friday:"Vendredi",saturday:"Samedi",sunday:"Dimanche",chest:"Poitrine",back:"Dos",shoulders:"Épaules",biceps:"Biceps",triceps:"Triceps",core:"Abdos",cardio:"Cardio",other:"Autre",createRoutine:"Créer routine",editRoutine:"Modifier routine",routineName:"Nom de la routine",assignDay:"Jour",restTimerDefault:"Minuteur repos",selectExercises:"Sélectionner",noRoutines:"Aucune routine. Créez la première.",workoutComplete:"Séance terminée",analysisTitle:"Analyse",totalVolume:"Volume total",totalSets:"Séries totales",musclesWorked:"Muscles touchés",duration:"Durée",restCompliance:"Discipline repos",overallGrade:"Note",strengths:"Points forts",improvements:"À améliorer",tips:"Prochaine séance",monthlyOverview:"Mensuel",weeklyOverview:"Hebdomadaire",workoutsCompleted:"Séances",mostTrained:"Plus entraîné",volumeTrend:"Tendance volume",progressiveOverload:"Surcharge progressive",lastSession:"Dernière",personalBest:"Record",prevWeights:"Précédent",noHistory:"Aucun historique. Complétez un entraînement.",tooMuchRest:"Trop de repos. Bougez.",restWarning:"Dépassé de",goodRest:"Bon repos",addCustomExercise:"Ajouter exercice",exerciseName:"Nom",muscleGroup:"Groupe",customExercises:"Exercices personnalisés",language:"Langue",welcomeBack:"Bon retour",todayRoutine:"Routine du jour",noRoutineToday:"Aucune routine aujourd'hui",recentWorkouts:"Récents",emptyWorkout:"Entraînement libre",restBetweenSets:"Repos entre séries",criticalMode:"Mode critique",criticalModeDesc:"Alertes repos trop long",on:"OUI",off:"NON",primaryMuscles:"Muscles principaux",volume:"Volume",selectRoutine:"Choisir une routine",muscleHeatmap:"Carte musculaire",allTime:"Tout",thisMonth:"Ce mois",thisWeek:"Semaine",glutes:"Fessiers",hamstrings:"Ischio-jambiers",quads:"Quadriceps",calves:"Mollets",forearms:"Avant-bras",abs:"Abdos",lowerBack:"Bas du dos",upperBack:"Haut du dos",lats:"Dorsaux",traps:"Trapèzes",rearDelts:"Deltoïdes arr.",frontDelts:"Deltoïdes av.",sideDelts:"Deltoïdes lat.",upperChest:"Poitrine haute",midChest:"Poitrine moy.",lowerChest:"Poitrine basse",analysis_excellent:"Discipline remarquable. Bien mérité.",analysis_good:"Bon travail. Poussez encore plus.",analysis_average:"Vous êtes venu. Revenez plus fort.",analysis_poor:"Séance difficile. Corrigez demain.",analysis_rest_good:"Repos bien gérés. La discipline gagne.",analysis_rest_bad:"Trop de pauses longues. Resserrez.",analysis_volume_high:"Gros volume — récupérez bien.",analysis_volume_low:"Volume bas. Ajoutez des séries.",analysis_tip_progressive:"Ajoutez 2.5-5 lbs aux exercices principaux.",analysis_tip_rest:"Respectez le minuteur. Chaque seconde compte.",analysis_tip_form:"Reps incomplètes? Baissez le poids.",analysis_tip_consistency:"Revenez demain. C'est le secret.",socialHub:"Communauté",shareWorkout:"Partager",postWorkout:"Publier",writeCaption:"Écrire quelque chose...",post:"Publier",takePhoto:"Caméra",uploadPhoto:"Galerie",includeRoutine:"Inclure routine",includeDashboard:"Inclure stats",includeExercises:"Inclure exercices",noPostsYet:"Aucun post. Soyez le premier.",follow:"Suivre",following:"Abonné",unfollow:"Se désabonner",feedAll:"Tous",feedFollowing:"Abonnements",like:"Aimer",liked:"Aimé",writeComment:"Ajouter un commentaire...",comments:"Commentaires",justNow:"maintenant",minutesAgo:"m",hoursAgo:"h",daysAgo:"j",exercises:"Exercices",passwordMismatch:"Mots de passe différents",emailRequired:"Courriel requis",emailTaken:"Courriel déjà utilisé",invalidEmail:"Courriel invalide",usernameTaken:"Nom pris",fillAllFields:"Remplir tous les champs",invalidCredentials:"Identifiants invalides",memberSince:"Membre depuis",deletePost:"Supprimer le post",deleteComment:"Supprimer",confirmDelete:"Êtes-vous sûr?",yes:"Oui",no:"Non"}};

// ── Exercise DB ──
const EX=[{id:1,n:"Barbell Bench Press",c:"chest",p:["midChest","triceps"],s:["frontDelts"]},{id:2,n:"Incline Barbell Bench Press",c:"chest",p:["upperChest","frontDelts"],s:["triceps"]},{id:3,n:"Decline Barbell Bench Press",c:"chest",p:["lowerChest","triceps"],s:["midChest"]},{id:4,n:"Dumbbell Bench Press",c:"chest",p:["midChest","triceps"],s:["frontDelts"]},{id:5,n:"Incline Dumbbell Press",c:"chest",p:["upperChest","frontDelts"],s:["triceps"]},{id:6,n:"Decline Dumbbell Press",c:"chest",p:["lowerChest"],s:["triceps"]},{id:7,n:"Chest Fly (Dumbbell)",c:"chest",p:["midChest"],s:["frontDelts"]},{id:8,n:"Incline Dumbbell Fly",c:"chest",p:["upperChest"],s:["frontDelts"]},{id:9,n:"Decline Dumbbell Fly",c:"chest",p:["lowerChest"],s:["midChest"]},{id:10,n:"Cable Chest Fly",c:"chest",p:["midChest"],s:["frontDelts"]},{id:11,n:"Incline Cable Fly",c:"chest",p:["upperChest"],s:["frontDelts"]},{id:12,n:"Decline Cable Fly",c:"chest",p:["lowerChest"],s:[]},{id:13,n:"Pec Deck Machine",c:"chest",p:["midChest"],s:["frontDelts"]},{id:14,n:"Push-Up",c:"chest",p:["midChest","triceps"],s:["frontDelts","core"]},{id:15,n:"Incline Push-Up",c:"chest",p:["lowerChest"],s:["triceps"]},{id:16,n:"Decline Push-Up",c:"chest",p:["upperChest"],s:["triceps"]},{id:17,n:"Weighted Push-Up",c:"chest",p:["midChest","triceps"],s:["frontDelts"]},{id:18,n:"Close-Grip Push-Up",c:"chest",p:["triceps","midChest"],s:[]},{id:19,n:"Wide-Grip Push-Up",c:"chest",p:["midChest"],s:["triceps"]},{id:20,n:"Svend Press",c:"chest",p:["midChest"],s:[]},{id:21,n:"Plate Press",c:"chest",p:["midChest"],s:["triceps"]},{id:22,n:"Smith Machine Bench Press",c:"chest",p:["midChest","triceps"],s:["frontDelts"]},{id:23,n:"Incline Smith Press",c:"chest",p:["upperChest"],s:["triceps"]},{id:24,n:"Decline Smith Press",c:"chest",p:["lowerChest"],s:["triceps"]},{id:25,n:"Guillotine Press",c:"chest",p:["upperChest","midChest"],s:[]},{id:26,n:"Spoto Press",c:"chest",p:["midChest"],s:["triceps"]},{id:27,n:"Floor Press",c:"chest",p:["midChest","triceps"],s:[]},{id:28,n:"Dumbbell Pullover",c:"chest",p:["midChest","lats"],s:[]},{id:29,n:"Machine Chest Press",c:"chest",p:["midChest"],s:["triceps"]},{id:30,n:"Hammer Strength Chest Press",c:"chest",p:["midChest"],s:["triceps"]},{id:31,n:"Landmine Press",c:"chest",p:["upperChest","frontDelts"],s:["triceps"]},{id:32,n:"Single-Arm Cable Press",c:"chest",p:["midChest"],s:["core"]},{id:33,n:"Resistance Band Chest Press",c:"chest",p:["midChest"],s:["triceps"]},{id:34,n:"Explosive Push-Up",c:"chest",p:["midChest","triceps"],s:[]},{id:35,n:"Ring Push-Up",c:"chest",p:["midChest","core"],s:["triceps"]},{id:36,n:"Archer Push-Up",c:"chest",p:["midChest"],s:["triceps"]},{id:37,n:"Chest Dips",c:"chest",p:["lowerChest","triceps"],s:["frontDelts"]},{id:38,n:"Weighted Chest Dips",c:"chest",p:["lowerChest","triceps"],s:[]},{id:39,n:"Straight Bar Dips",c:"chest",p:["lowerChest","triceps"],s:[]},{id:40,n:"Deficit Push-Up",c:"chest",p:["midChest"],s:["triceps"]},
{id:41,n:"Pull-Up",c:"back",p:["lats","biceps"],s:["upperBack"]},{id:42,n:"Chin-Up",c:"back",p:["lats","biceps"],s:["upperBack"]},{id:43,n:"Wide-Grip Pull-Up",c:"back",p:["lats"],s:["biceps"]},{id:44,n:"Close-Grip Pull-Up",c:"back",p:["lats","biceps"],s:[]},{id:45,n:"Neutral Grip Pull-Up",c:"back",p:["lats","biceps"],s:[]},{id:46,n:"Lat Pulldown",c:"back",p:["lats"],s:["biceps"]},{id:47,n:"Wide-Grip Lat Pulldown",c:"back",p:["lats"],s:["biceps"]},{id:48,n:"Close-Grip Lat Pulldown",c:"back",p:["lats","biceps"],s:[]},{id:49,n:"Reverse-Grip Lat Pulldown",c:"back",p:["lats","biceps"],s:[]},{id:50,n:"Straight Arm Pulldown",c:"back",p:["lats"],s:["triceps"]},{id:51,n:"Barbell Row",c:"back",p:["upperBack","lats"],s:["biceps","lowerBack"]},{id:52,n:"Pendlay Row",c:"back",p:["upperBack","lats"],s:["biceps"]},{id:53,n:"T-Bar Row",c:"back",p:["upperBack","lats"],s:["biceps"]},{id:54,n:"Seated Cable Row",c:"back",p:["upperBack","lats"],s:["biceps"]},{id:55,n:"Wide-Grip Cable Row",c:"back",p:["upperBack"],s:["rearDelts"]},{id:56,n:"Close-Grip Cable Row",c:"back",p:["lats"],s:["biceps"]},{id:57,n:"Single-Arm Dumbbell Row",c:"back",p:["lats","upperBack"],s:["biceps"]},{id:58,n:"Chest-Supported Row",c:"back",p:["upperBack"],s:["lats"]},{id:59,n:"Machine Row",c:"back",p:["upperBack","lats"],s:[]},{id:60,n:"Hammer Strength Row",c:"back",p:["lats","upperBack"],s:[]},{id:61,n:"Inverted Row",c:"back",p:["upperBack"],s:["biceps"]},{id:62,n:"TRX Row",c:"back",p:["upperBack"],s:["core"]},{id:63,n:"Rack Pull",c:"back",p:["upperBack","traps"],s:["lowerBack"]},{id:64,n:"Deadlift",c:"back",p:["lowerBack","glutes","hamstrings"],s:["upperBack","traps","quads"]},{id:65,n:"Sumo Deadlift",c:"back",p:["glutes","quads"],s:["lowerBack"]},{id:66,n:"Romanian Deadlift",c:"back",p:["hamstrings","glutes"],s:["lowerBack"]},{id:67,n:"Stiff-Leg Deadlift",c:"back",p:["hamstrings","lowerBack"],s:["glutes"]},{id:68,n:"Snatch-Grip Deadlift",c:"back",p:["upperBack","traps"],s:["lowerBack"]},{id:69,n:"Meadows Row",c:"back",p:["lats","upperBack"],s:["biceps"]},{id:70,n:"Kroc Row",c:"back",p:["lats","upperBack"],s:["forearms"]},{id:71,n:"Landmine Row",c:"back",p:["lats","upperBack"],s:[]},{id:72,n:"Seal Row",c:"back",p:["upperBack","lats"],s:["rearDelts"]},{id:73,n:"Face Pull",c:"back",p:["rearDelts","traps"],s:["upperBack"]},{id:74,n:"Reverse Pec Deck",c:"back",p:["rearDelts"],s:["upperBack"]},{id:75,n:"Rear Delt Cable Fly",c:"back",p:["rearDelts"],s:[]},{id:76,n:"Resistance Band Row",c:"back",p:["upperBack"],s:["biceps"]},{id:77,n:"Good Morning",c:"back",p:["lowerBack","hamstrings"],s:["glutes"]},{id:78,n:"Hyperextension",c:"back",p:["lowerBack"],s:["glutes"]},{id:79,n:"Back Extension",c:"back",p:["lowerBack"],s:["glutes"]},{id:80,n:"Superman Hold",c:"back",p:["lowerBack"],s:[]},{id:81,n:"Cable Pullover",c:"back",p:["lats"],s:[]},{id:82,n:"Machine Pullover",c:"back",p:["lats"],s:[]},{id:83,n:"Straight Arm Lat Pushdown",c:"back",p:["lats"],s:[]},{id:84,n:"Single-Arm Lat Pulldown",c:"back",p:["lats"],s:["biceps"]},{id:85,n:"Weighted Pull-Up",c:"back",p:["lats","biceps"],s:["upperBack"]},{id:86,n:"Weighted Chin-Up",c:"back",p:["lats","biceps"],s:[]},{id:87,n:"Dead Hang",c:"back",p:["forearms"],s:["lats"]},{id:88,n:"Scapular Pull-Up",c:"back",p:["upperBack","traps"],s:[]},{id:89,n:"Renegade Row",c:"back",p:["upperBack","core"],s:["lats"]},{id:90,n:"Gorilla Row",c:"back",p:["lats","upperBack"],s:["core"]},
{id:91,n:"Overhead Barbell Press",c:"shoulders",p:["frontDelts","sideDelts"],s:["triceps"]},{id:92,n:"Seated Barbell Press",c:"shoulders",p:["frontDelts","sideDelts"],s:["triceps"]},{id:93,n:"Dumbbell Shoulder Press",c:"shoulders",p:["frontDelts","sideDelts"],s:["triceps"]},{id:94,n:"Seated Dumbbell Press",c:"shoulders",p:["frontDelts","sideDelts"],s:["triceps"]},{id:95,n:"Arnold Press",c:"shoulders",p:["frontDelts","sideDelts"],s:["triceps"]},{id:96,n:"Push Press",c:"shoulders",p:["frontDelts","sideDelts"],s:["triceps"]},{id:97,n:"Bradford Press",c:"shoulders",p:["frontDelts","sideDelts"],s:[]},{id:98,n:"Behind-the-Neck Press",c:"shoulders",p:["sideDelts"],s:["triceps"]},{id:99,n:"Machine Shoulder Press",c:"shoulders",p:["frontDelts","sideDelts"],s:["triceps"]},{id:100,n:"Smith Machine Shoulder Press",c:"shoulders",p:["frontDelts"],s:["triceps"]},{id:101,n:"Lateral Raise (Dumbbell)",c:"shoulders",p:["sideDelts"],s:["traps"]},{id:102,n:"Seated Lateral Raise",c:"shoulders",p:["sideDelts"],s:[]},{id:103,n:"Cable Lateral Raise",c:"shoulders",p:["sideDelts"],s:[]},{id:104,n:"Leaning Lateral Raise",c:"shoulders",p:["sideDelts"],s:[]},{id:105,n:"Front Raise (Dumbbell)",c:"shoulders",p:["frontDelts"],s:[]},{id:106,n:"Barbell Front Raise",c:"shoulders",p:["frontDelts"],s:[]},{id:107,n:"Plate Front Raise",c:"shoulders",p:["frontDelts"],s:["traps"]},{id:108,n:"Cable Front Raise",c:"shoulders",p:["frontDelts"],s:[]},{id:109,n:"Rear Delt Fly",c:"shoulders",p:["rearDelts"],s:["upperBack"]},{id:110,n:"Reverse Cable Fly",c:"shoulders",p:["rearDelts"],s:[]},{id:111,n:"Face Pull (Shoulders)",c:"shoulders",p:["rearDelts","traps"],s:[]},{id:112,n:"Upright Row (Barbell)",c:"shoulders",p:["sideDelts","traps"],s:["biceps"]},{id:113,n:"Upright Row (Dumbbell)",c:"shoulders",p:["sideDelts","traps"],s:[]},{id:114,n:"Cable Upright Row",c:"shoulders",p:["sideDelts","traps"],s:[]},{id:115,n:"Shrugs (Barbell)",c:"shoulders",p:["traps"],s:["forearms"]},{id:116,n:"Shrugs (Dumbbell)",c:"shoulders",p:["traps"],s:[]},{id:117,n:"Smith Machine Shrug",c:"shoulders",p:["traps"],s:[]},{id:118,n:"Behind-the-Back Shrug",c:"shoulders",p:["traps"],s:[]},{id:119,n:"Farmer's Carry",c:"shoulders",p:["traps","forearms"],s:["core"]},{id:120,n:"Overhead Carry",c:"shoulders",p:["sideDelts","core"],s:[]},{id:121,n:"Cuban Press",c:"shoulders",p:["rearDelts","sideDelts"],s:[]},{id:122,n:"Landmine Shoulder Press",c:"shoulders",p:["frontDelts"],s:["triceps"]},{id:123,n:"Single-Arm Dumbbell Press",c:"shoulders",p:["frontDelts","sideDelts"],s:["core"]},{id:124,n:"Z Press",c:"shoulders",p:["frontDelts","sideDelts"],s:["core"]},{id:125,n:"Resistance Band Shoulder Press",c:"shoulders",p:["frontDelts","sideDelts"],s:[]},{id:126,n:"Y Raise",c:"shoulders",p:["rearDelts","traps"],s:[]},{id:127,n:"T Raise",c:"shoulders",p:["rearDelts"],s:["traps"]},{id:128,n:"W Raise",c:"shoulders",p:["rearDelts","traps"],s:[]},{id:129,n:"Scaption Raise",c:"shoulders",p:["frontDelts","sideDelts"],s:[]},{id:130,n:"Kettlebell Shoulder Press",c:"shoulders",p:["frontDelts","sideDelts"],s:["triceps"]},
{id:131,n:"Barbell Curl",c:"biceps",p:["biceps"],s:["forearms"]},{id:132,n:"EZ Bar Curl",c:"biceps",p:["biceps"],s:["forearms"]},{id:133,n:"Dumbbell Curl",c:"biceps",p:["biceps"],s:["forearms"]},{id:134,n:"Alternating Dumbbell Curl",c:"biceps",p:["biceps"],s:[]},{id:135,n:"Hammer Curl",c:"biceps",p:["biceps","forearms"],s:[]},{id:136,n:"Cross-Body Hammer Curl",c:"biceps",p:["biceps","forearms"],s:[]},{id:137,n:"Concentration Curl",c:"biceps",p:["biceps"],s:[]},{id:138,n:"Preacher Curl",c:"biceps",p:["biceps"],s:[]},{id:139,n:"Machine Preacher Curl",c:"biceps",p:["biceps"],s:[]},{id:140,n:"Cable Curl",c:"biceps",p:["biceps"],s:["forearms"]},{id:141,n:"Rope Cable Curl",c:"biceps",p:["biceps","forearms"],s:[]},{id:142,n:"Reverse Curl",c:"biceps",p:["forearms","biceps"],s:[]},{id:143,n:"Spider Curl",c:"biceps",p:["biceps"],s:[]},{id:144,n:"Incline Dumbbell Curl",c:"biceps",p:["biceps"],s:[]},{id:145,n:"Drag Curl",c:"biceps",p:["biceps"],s:[]},{id:146,n:"Zottman Curl",c:"biceps",p:["biceps","forearms"],s:[]},{id:147,n:"Bayesian Curl",c:"biceps",p:["biceps"],s:[]},{id:148,n:"Resistance Band Curl",c:"biceps",p:["biceps"],s:[]},{id:149,n:"Chin-Up (Biceps Focus)",c:"biceps",p:["biceps","lats"],s:[]},{id:150,n:"Close-Grip EZ Curl",c:"biceps",p:["biceps"],s:[]},{id:151,n:"Cable High Curl",c:"biceps",p:["biceps"],s:[]},{id:152,n:"One-Arm Cable Curl",c:"biceps",p:["biceps"],s:[]},{id:153,n:"Barbell 21s",c:"biceps",p:["biceps"],s:["forearms"]},{id:154,n:"Isometric Curl Hold",c:"biceps",p:["biceps"],s:[]},{id:155,n:"Plate Curl",c:"biceps",p:["biceps"],s:[]},{id:156,n:"Kettlebell Curl",c:"biceps",p:["biceps"],s:[]},{id:157,n:"Fat Grip Curl",c:"biceps",p:["biceps","forearms"],s:[]},{id:158,n:"Seated Dumbbell Curl",c:"biceps",p:["biceps"],s:[]},{id:159,n:"Standing Cable Curl",c:"biceps",p:["biceps"],s:[]},{id:160,n:"Reverse-Grip Cable Curl",c:"biceps",p:["forearms","biceps"],s:[]},
{id:161,n:"Close-Grip Bench Press",c:"triceps",p:["triceps","midChest"],s:[]},{id:162,n:"Tricep Dips",c:"triceps",p:["triceps"],s:["midChest"]},{id:163,n:"Weighted Tricep Dips",c:"triceps",p:["triceps"],s:["midChest"]},{id:164,n:"Bench Dips",c:"triceps",p:["triceps"],s:[]},{id:165,n:"Cable Pushdown",c:"triceps",p:["triceps"],s:[]},{id:166,n:"Rope Pushdown",c:"triceps",p:["triceps"],s:[]},{id:167,n:"Reverse-Grip Pushdown",c:"triceps",p:["triceps"],s:[]},{id:168,n:"Overhead Cable Extension",c:"triceps",p:["triceps"],s:[]},{id:169,n:"Overhead Dumbbell Extension",c:"triceps",p:["triceps"],s:[]},{id:170,n:"Seated Overhead Extension",c:"triceps",p:["triceps"],s:[]},{id:171,n:"Skull Crushers",c:"triceps",p:["triceps"],s:[]},{id:172,n:"EZ Bar Skull Crushers",c:"triceps",p:["triceps"],s:[]},{id:173,n:"Dumbbell Skull Crushers",c:"triceps",p:["triceps"],s:[]},{id:174,n:"Incline Skull Crushers",c:"triceps",p:["triceps"],s:[]},{id:175,n:"JM Press",c:"triceps",p:["triceps"],s:[]},{id:176,n:"Tate Press",c:"triceps",p:["triceps"],s:[]},{id:177,n:"Kickbacks (Dumbbell)",c:"triceps",p:["triceps"],s:[]},{id:178,n:"Cable Kickbacks",c:"triceps",p:["triceps"],s:[]},{id:179,n:"Single-Arm Pushdown",c:"triceps",p:["triceps"],s:[]},{id:180,n:"Machine Tricep Extension",c:"triceps",p:["triceps"],s:[]},{id:181,n:"Resistance Band Pushdown",c:"triceps",p:["triceps"],s:[]},{id:182,n:"Diamond Push-Up",c:"triceps",p:["triceps","midChest"],s:[]},{id:183,n:"Close-Grip Push-Up (Triceps)",c:"triceps",p:["triceps"],s:[]},{id:184,n:"Floor Skull Crushers",c:"triceps",p:["triceps"],s:[]},{id:185,n:"Plate Extension",c:"triceps",p:["triceps"],s:[]},{id:186,n:"One-Arm Overhead Extension",c:"triceps",p:["triceps"],s:[]},{id:187,n:"Cable Rope Overhead Extension",c:"triceps",p:["triceps"],s:[]},{id:188,n:"Bar Pushdown",c:"triceps",p:["triceps"],s:[]},{id:189,n:"Cross-Body Cable Extension",c:"triceps",p:["triceps"],s:[]},{id:190,n:"Decline Skull Crushers",c:"triceps",p:["triceps"],s:[]},
{id:191,n:"Back Squat",c:"legs",p:["quads","glutes"],s:["hamstrings","core"]},{id:192,n:"Front Squat",c:"legs",p:["quads"],s:["glutes","core"]},{id:193,n:"Goblet Squat",c:"legs",p:["quads","glutes"],s:["core"]},{id:194,n:"Bulgarian Split Squat",c:"legs",p:["quads","glutes"],s:["hamstrings"]},{id:195,n:"Walking Lunges",c:"legs",p:["quads","glutes"],s:["hamstrings"]},{id:196,n:"Reverse Lunges",c:"legs",p:["quads","glutes"],s:[]},{id:197,n:"Stationary Lunges",c:"legs",p:["quads","glutes"],s:[]},{id:198,n:"Step-Ups",c:"legs",p:["quads","glutes"],s:[]},{id:199,n:"Leg Press",c:"legs",p:["quads","glutes"],s:["hamstrings"]},{id:200,n:"Hack Squat",c:"legs",p:["quads"],s:["glutes"]},{id:201,n:"Smith Machine Squat",c:"legs",p:["quads","glutes"],s:[]},{id:202,n:"Sissy Squat",c:"legs",p:["quads"],s:[]},{id:203,n:"Leg Extension",c:"legs",p:["quads"],s:[]},{id:204,n:"Romanian Deadlift (Legs)",c:"legs",p:["hamstrings","glutes"],s:["lowerBack"]},{id:205,n:"Stiff-Leg Deadlift (Legs)",c:"legs",p:["hamstrings"],s:["glutes"]},{id:206,n:"Glute Bridge",c:"legs",p:["glutes"],s:["hamstrings"]},{id:207,n:"Hip Thrust",c:"legs",p:["glutes"],s:["hamstrings"]},{id:208,n:"Barbell Hip Thrust",c:"legs",p:["glutes"],s:["hamstrings","core"]},{id:209,n:"Cable Pull-Through",c:"legs",p:["glutes","hamstrings"],s:[]},{id:210,n:"Kettlebell Swing",c:"legs",p:["glutes","hamstrings"],s:["core"]},{id:211,n:"Hamstring Curl (Lying)",c:"legs",p:["hamstrings"],s:[]},{id:212,n:"Hamstring Curl (Seated)",c:"legs",p:["hamstrings"],s:[]},{id:213,n:"Nordic Curl",c:"legs",p:["hamstrings"],s:[]},{id:214,n:"Glute Kickback (Machine)",c:"legs",p:["glutes"],s:[]},{id:215,n:"Cable Kickback",c:"legs",p:["glutes"],s:[]},{id:216,n:"Standing Calf Raise",c:"legs",p:["calves"],s:[]},{id:217,n:"Seated Calf Raise",c:"legs",p:["calves"],s:[]},{id:218,n:"Donkey Calf Raise",c:"legs",p:["calves"],s:[]},{id:219,n:"Single-Leg Calf Raise",c:"legs",p:["calves"],s:[]},{id:220,n:"Box Jump",c:"legs",p:["quads","glutes"],s:["calves"]},{id:221,n:"Jump Squat",c:"legs",p:["quads","glutes"],s:["calves"]},{id:222,n:"Pistol Squat",c:"legs",p:["quads","glutes"],s:["core"]},{id:223,n:"Step-Back Squat",c:"legs",p:["quads","glutes"],s:[]},{id:224,n:"Zercher Squat",c:"legs",p:["quads","glutes"],s:["core"]},{id:225,n:"Jefferson Squat",c:"legs",p:["quads","glutes"],s:[]},{id:226,n:"Deficit Deadlift",c:"legs",p:["hamstrings","glutes"],s:["quads"]},{id:227,n:"Trap Bar Deadlift",c:"legs",p:["quads","glutes"],s:["hamstrings","traps"]},{id:228,n:"Curtsy Lunge",c:"legs",p:["glutes","quads"],s:[]},{id:229,n:"Frog Pump",c:"legs",p:["glutes"],s:[]},{id:230,n:"Resistance Band Squat",c:"legs",p:["quads","glutes"],s:[]},{id:231,n:"Single-Leg Deadlift",c:"legs",p:["hamstrings","glutes"],s:["core"]},{id:232,n:"Cable Squat",c:"legs",p:["quads","glutes"],s:[]},{id:233,n:"Hack Machine Reverse",c:"legs",p:["glutes","hamstrings"],s:[]},{id:234,n:"Leg Press Calf Raise",c:"legs",p:["calves"],s:[]},{id:235,n:"Smith Machine Lunge",c:"legs",p:["quads","glutes"],s:[]},{id:236,n:"Barbell Step-Up",c:"legs",p:["quads","glutes"],s:[]},{id:237,n:"Elevated Goblet Squat",c:"legs",p:["quads","glutes"],s:["core"]},{id:238,n:"Isometric Wall Sit",c:"legs",p:["quads"],s:[]},{id:239,n:"Broad Jump",c:"legs",p:["quads","glutes"],s:["calves"]},{id:240,n:"Speed Skater Jump",c:"legs",p:["glutes","quads"],s:["calves"]},
{id:241,n:"Plank",c:"core",p:["abs","core"],s:["lowerBack"]},{id:242,n:"Side Plank",c:"core",p:["abs","core"],s:[]},{id:243,n:"Hanging Leg Raise",c:"core",p:["abs"],s:["forearms"]},{id:244,n:"Hanging Knee Raise",c:"core",p:["abs"],s:[]},{id:245,n:"Cable Crunch",c:"core",p:["abs"],s:[]},{id:246,n:"Ab Wheel Rollout",c:"core",p:["abs","core"],s:[]},{id:247,n:"Russian Twist",c:"core",p:["abs","core"],s:[]},{id:248,n:"Bicycle Crunch",c:"core",p:["abs"],s:[]},{id:249,n:"Reverse Crunch",c:"core",p:["abs"],s:[]},{id:250,n:"Mountain Climbers",c:"core",p:["abs","core"],s:["quads"]},
{id:301,n:"Treadmill",c:"cardio",p:["quads","hamstrings","calves"],s:["glutes"],cd:1},{id:302,n:"Stationary Bike",c:"cardio",p:["quads","hamstrings"],s:["calves"],cd:1},{id:303,n:"Elliptical",c:"cardio",p:["quads","glutes"],s:["hamstrings"],cd:1},{id:304,n:"Rowing Machine",c:"cardio",p:["upperBack","lats","quads"],s:["biceps"],cd:1},{id:305,n:"Stair Climber",c:"cardio",p:["quads","glutes","calves"],s:[],cd:1},{id:306,n:"Jump Rope",c:"cardio",p:["calves","quads"],s:["core"],cd:1},{id:307,n:"Boxing",c:"cardio",p:["frontDelts","core","biceps"],s:["triceps"],cd:1},{id:308,n:"Kickboxing",c:"cardio",p:["quads","core"],s:["calves","glutes"],cd:1},{id:309,n:"Swimming",c:"cardio",p:["lats","frontDelts","core"],s:["biceps"],cd:1},{id:310,n:"Walking",c:"cardio",p:["quads","hamstrings"],s:["calves"],cd:1},{id:311,n:"Soccer",c:"cardio",p:["quads","hamstrings","calves"],s:["glutes"],cd:1},{id:312,n:"Sprints",c:"cardio",p:["quads","hamstrings","glutes"],s:["calves"],cd:1},{id:313,n:"Battle Ropes",c:"cardio",p:["frontDelts","core"],s:["forearms"],cd:1}];

const EXERCISE_DB = EX.map(e=>({id:e.id,name:e.n,category:e.c,primary:e.p,secondary:e.s,isCardio:!!e.cd}));
const DAYS=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
const CATS=["chest","back","shoulders","biceps","triceps","legs","core","cardio","other"];
const ALL_M=["upperChest","midChest","lowerChest","frontDelts","sideDelts","rearDelts","traps","lats","upperBack","lowerBack","biceps","triceps","forearms","quads","hamstrings","glutes","calves","abs","core"];
const MC={upperChest:"#c2956a",midChest:"#d4a574",lowerChest:"#e6c9a8",frontDelts:"#8b7355",sideDelts:"#a08060",rearDelts:"#b5936b",traps:"#7a8b6f",lats:"#6b8f71",upperBack:"#5a7a5e",lowerBack:"#7fa882",biceps:"#6a8fa0",triceps:"#5a7f90",forearms:"#7aaabb",quads:"#8b7ea0",hamstrings:"#9b8eb0",glutes:"#ab9ec0",calves:"#bbb0d0",abs:"#c49a8a",core:"#d4aa9a"};
const AC=["#8b7355","#6b8f71","#6a8fa0","#8b7ea0","#c49a8a","#c2956a","#5a7a5e","#7aaabb","#ab9ec0","#d4a574"];

// ── Helpers ──
const uid=()=>Math.random().toString(36).substr(2,9);
const fmt=s=>`${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;
const fmtD=s=>{const m=Math.floor(s/60),h=Math.floor(m/60);return h>0?`${h}h ${m%60}m`:`${m}m`};
const dN=d=>DAYS[d.getDay()];
const vE=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const aC=name=>AC[(name||'?').split('').reduce((a,c)=>a+c.charCodeAt(0),0)%AC.length];
const tA=(iso,t)=>{const d=(Date.now()-new Date(iso).getTime())/1000;if(d<60)return t.justNow;if(d<3600)return`${Math.floor(d/60)}${t.minutesAgo}`;if(d<86400)return`${Math.floor(d/3600)}${t.hoursAgo}`;return`${Math.floor(d/86400)}${t.daysAgo}`};
const St={get:async k=>{try{const r=await window.storage.get(k);return r?JSON.parse(r.value):null}catch{return null}},set:async(k,v)=>{try{await window.storage.set(k,JSON.stringify(v))}catch(e){console.error(e)}},gS:async k=>{try{const r=await window.storage.get(k,true);return r?JSON.parse(r.value):null}catch{return null}},sS:async(k,v)=>{try{await window.storage.set(k,JSON.stringify(v),true)}catch(e){console.error(e)}}};

// ── Design Tokens ──
const C={bg:'#0c0b0a',card:'#151413',cardHover:'#1a1918',border:'#1f1e1c',borderLight:'#2a2826',accent:'#c2956a',accentLight:'#d4a574',accentDim:'#8b7355',text:'#e8e4de',textMid:'#9a9590',textDim:'#5a5650',danger:'#a04040',dangerLight:'#c05050',success:'#6b8f71',successLight:'#7fa882',white:'#f5f0ea'};

function Timer({start}){const[n,sN]=useState(Date.now());useEffect(()=>{const i=setInterval(()=>sN(Date.now()),1000);return()=>clearInterval(i)},[]);if(!start)return null;return(<div style={{fontSize:12,color:C.accent,fontFamily:"'Azeret Mono',monospace",marginTop:2,display:'flex',alignItems:'center',gap:4}}>{I.clock} {fmt(Math.floor((n-start)/1000))}</div>)}

function RestOverlay({seconds,onSkip,onDone,critical,lang}){const t=T[lang];const[r,sR]=useState(seconds);const[ex,sE]=useState(false);
useEffect(()=>{const i=setInterval(()=>sR(p=>{if(p-1<=0&&!ex)sE(true);return p-1}),1000);return()=>clearInterval(i)},[]);
const o=r<0;const pct=ex?100:Math.max(0,((seconds-r)/seconds)*100);
return(<div style={{position:'fixed',inset:0,zIndex:1000,background:o&&critical?`linear-gradient(180deg,${C.danger}f0,#1a0808f0)`:`linear-gradient(180deg,${C.bg}f5,#000f5)`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
<div style={{fontSize:11,letterSpacing:4,color:o?C.dangerLight:C.textDim,marginBottom:20,textTransform:'uppercase',fontFamily:"'Azeret Mono',monospace"}}>{o&&critical?t.tooMuchRest:t.restTimer}</div>
<div style={{width:180,height:180,borderRadius:'50%',position:'relative',background:`conic-gradient(${o?C.danger:C.accent} ${pct}%, ${C.border} ${pct}%)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
<div style={{width:152,height:152,borderRadius:'50%',background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
<span style={{fontSize:40,fontWeight:300,color:o?C.dangerLight:C.white,fontFamily:"'Instrument Serif',serif",letterSpacing:2}}>{o?'+':''}{fmt(Math.abs(r))}</span>
</div></div>
{o&&critical&&<div style={{marginTop:16,fontSize:13,color:C.dangerLight,fontWeight:500,textAlign:'center',padding:'0 20px',fontFamily:"'Azeret Mono',monospace"}}>{t.restWarning} {fmt(Math.abs(r))}</div>}
<div style={{display:'flex',gap:12,marginTop:28}}>
<button onClick={onSkip} style={{padding:'11px 28px',background:'transparent',border:`1px solid ${C.border}`,color:C.textMid,borderRadius:8,fontSize:14,cursor:'pointer',fontFamily:"'Satoshi',sans-serif",fontWeight:500}}>{t.skip}</button>
<button onClick={()=>onDone(o?Math.abs(r):0)} style={{padding:'11px 28px',background:o?C.danger:C.accent,border:'none',color:C.white,borderRadius:8,fontSize:14,cursor:'pointer',fontWeight:600,fontFamily:"'Satoshi',sans-serif"}}>{o?"GO":"Done"}</button>
</div></div>)}

function Heatmap({data,lang}){const t=T[lang];const mx=Math.max(...Object.values(data),1);const so=Object.entries(data).sort((a,b)=>b[1]-a[1]).filter(([,v])=>v>0);
return(<div style={{display:'flex',flexWrap:'wrap',gap:4}}>{so.map(([m,v])=>(<div key={m} style={{padding:'4px 10px',borderRadius:6,fontSize:10,fontWeight:500,background:MC[m]||C.accentDim,opacity:0.35+(v/mx)*0.65,color:C.white,fontFamily:"'Azeret Mono',monospace",letterSpacing:0.5}}>{t[m]||m} ×{v}</div>))}</div>)}

function Av({name,size=34,photo=null}){if(photo)return(<img src={photo} style={{width:size,height:size,borderRadius:size*0.3,objectFit:'cover'}}/>);const c=aC(name||'?');
return(<div style={{width:size,height:size,borderRadius:size*0.3,background:`linear-gradient(135deg,${c},${c}99)`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:600,color:C.white,fontSize:size*0.38,fontFamily:"'Satoshi',sans-serif",flexShrink:0}}>{(name||'?')[0].toUpperCase()}</div>)}

function Analysis({data,exDB,lang,onClose,onShare}){const t=T[lang];const{exercises,duration,restViolations:rv=0}=data;
let tv=0,ts=0;const mh={};
exercises.forEach(ex=>{const d=exDB.find(e=>e.id===ex.exerciseId);ex.sets.forEach(s=>{if(s.weight&&s.reps){tv+=s.weight*s.reps;ts++}else if(s.duration)ts++});if(d){(d.primary||[]).forEach(m=>{mh[m]=(mh[m]||0)+ex.sets.length});(d.secondary||[]).forEach(m=>{mh[m]=(mh[m]||0)+Math.ceil(ex.sets.length*0.5)})}});
const rp=ts>0?Math.max(0,100-(rv/ts*100)):100;const vps=ts>0?tv/ts:0;const sc=(rp*0.3)+(Math.min(ts/20,1)*40)+(Math.min(vps/100,1)*30);
let gr,gc,gm;if(sc>75){gr='A';gc=C.success;gm=t.analysis_excellent}else if(sc>55){gr='B';gc=C.accent;gm=t.analysis_good}else if(sc>35){gr='C';gc=C.accentDim;gm=t.analysis_average}else{gr='D';gc=C.danger;gm=t.analysis_poor}
const str=[],imp=[],tip=[];if(rp>80)str.push(t.analysis_rest_good);else imp.push(t.analysis_rest_bad);if(tv>10000)str.push(t.analysis_volume_high);else if(tv<3000&&ts>3)imp.push(t.analysis_volume_low);
tip.push(t.analysis_tip_progressive);if(rp<80)tip.push(t.analysis_tip_rest);tip.push(t.analysis_tip_form);tip.push(t.analysis_tip_consistency);
return(<div style={{position:'fixed',inset:0,zIndex:999,background:C.bg+'f8',overflow:'auto',padding:16,backdropFilter:'blur(20px)'}}>
<div style={{maxWidth:520,margin:'0 auto',paddingBottom:40}}>
<div style={{textAlign:'center',marginBottom:24}}>
<div style={{fontSize:11,letterSpacing:4,color:C.textDim,textTransform:'uppercase',fontFamily:"'Azeret Mono',monospace",marginBottom:8}}>{t.workoutComplete}</div>
<div style={{width:100,height:100,borderRadius:20,margin:'0 auto 12px',background:`conic-gradient(${gc} ${sc}%, ${C.border} ${sc}%)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
<div style={{width:80,height:80,borderRadius:16,background:C.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
<span style={{fontSize:36,fontWeight:300,color:gc,fontFamily:"'Instrument Serif',serif"}}>{gr}</span></div></div>
<div style={{color:C.textMid,fontSize:13,maxWidth:340,margin:'0 auto',fontStyle:'italic',fontFamily:"'Instrument Serif',serif"}}>{gm}</div></div>
<div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8,marginBottom:16}}>
{[{l:t.totalVolume,v:`${tv.toLocaleString()}`},{l:t.totalSets,v:ts},{l:t.duration,v:fmtD(duration)},{l:t.restCompliance,v:`${Math.round(rp)}%`}].map(({l,v})=>(<div key={l} style={{background:C.card,borderRadius:12,padding:14,textAlign:'center',border:`1px solid ${C.border}`}}><div style={{fontSize:9,color:C.textDim,textTransform:'uppercase',letterSpacing:1.5,marginBottom:3,fontFamily:"'Azeret Mono',monospace"}}>{l}</div><div style={{fontSize:22,fontWeight:300,color:C.white,fontFamily:"'Instrument Serif',serif"}}>{v}</div></div>))}
</div>
<div style={{background:C.card,borderRadius:12,padding:14,marginBottom:12,border:`1px solid ${C.border}`}}>
<div style={{fontSize:9,color:C.textDim,textTransform:'uppercase',letterSpacing:1.5,marginBottom:8,fontFamily:"'Azeret Mono',monospace"}}>{t.musclesWorked}</div><Heatmap data={mh} lang={lang}/></div>
{str.length>0&&<div style={{background:'#0f1a12',borderRadius:12,padding:14,marginBottom:8,border:`1px solid #1a2f1e`}}><div style={{fontSize:11,color:C.successLight,fontWeight:600,marginBottom:6,fontFamily:"'Azeret Mono',monospace"}}>{t.strengths}</div>{str.map((s,i)=><div key={i} style={{color:'#a8c8aa',fontSize:12,marginBottom:3,fontFamily:"'Satoshi',sans-serif"}}>{s}</div>)}</div>}
{imp.length>0&&<div style={{background:'#1a1510',borderRadius:12,padding:14,marginBottom:8,border:`1px solid #2a2218`}}><div style={{fontSize:11,color:C.accent,fontWeight:600,marginBottom:6,fontFamily:"'Azeret Mono',monospace"}}>{t.improvements}</div>{imp.map((s,i)=><div key={i} style={{color:C.accentLight,fontSize:12,marginBottom:3,fontFamily:"'Satoshi',sans-serif"}}>{s}</div>)}</div>}
<div style={{background:C.card,borderRadius:12,padding:14,marginBottom:20,border:`1px solid ${C.border}`}}><div style={{fontSize:11,color:C.textMid,fontWeight:600,marginBottom:6,fontFamily:"'Azeret Mono',monospace"}}>{t.tips}</div>{tip.map((s,i)=><div key={i} style={{color:C.textMid,fontSize:12,marginBottom:3,fontFamily:"'Satoshi',sans-serif"}}>{s}</div>)}</div>
<div style={{display:'flex',gap:8}}>
<button onClick={onClose} style={{flex:1,padding:14,background:C.accent,border:'none',borderRadius:10,color:C.white,fontSize:14,fontWeight:600,cursor:'pointer',fontFamily:"'Satoshi',sans-serif"}}>{t.save}</button>
<button onClick={onShare} style={{flex:1,padding:14,background:'transparent',border:`1px solid ${C.accent}`,borderRadius:10,color:C.accent,fontSize:14,fontWeight:600,cursor:'pointer',fontFamily:"'Satoshi',sans-serif"}}>{t.shareWorkout}</button>
</div></div></div>)}

// ═══ MAIN ═══
export default function App(){
const[lang,sL]=useState('en');const[user,sU]=useState(null);const[uData,sUD]=useState(null);const[load,sLoad]=useState(true);
const[pg,sPg]=useState('dashboard');const[routs,sR]=useState([]);const[hist,sH]=useState([]);const[cEx,sCE]=useState([]);const[tS,sTS]=useState({defaultRest:90,criticalMode:true});
const[aw,sAW]=useState(null);const[ws,sWS]=useState(null);const[srt,sSRT]=useState(false);const[rts,sRTS]=useState(90);const[rv,sRV]=useState(0);const[sa,sSA]=useState(null);
const[er,sER]=useState(null);const[sep,sSEP]=useState(false);const[ept,sEPT]=useState(null);const[st,sST]=useState('');const[fc,sFC]=useState('all');const[sac,sSAC]=useState(false);const[dr,sDR]=useState('thisMonth');
const[am,sAM]=useState('login');const[af,sAF]=useState({email:'',username:'',password:'',confirmPassword:'',newPassword:''});const[ae,sAE]=useState('');const[as2,sAS]=useState('');
const[posts,sP]=useState([]);const[hf,sHF]=useState('all');const[spc,sSPC]=useState(false);const[pcd,sPCD]=useState(null);const[fol,sFol]=useState([]);const[ap,sAP]=useState({});const[vp,sVP]=useState(null);const[cd,sCD]=useState(null);
const t=T[lang];const allEx=useMemo(()=>[...EXERCISE_DB,...cEx],[cEx]);const fR=useRef(null);const cR=useRef(null);

useEffect(()=>{(async()=>{const l=await St.get('il_lang');if(l)sL(l);const u=await St.get('il_user');if(u){sU(u);const p=await St.gS('il_profiles')||{};sAP(p);sUD(p[u]||null)}sLoad(false)})()},[]);
useEffect(()=>{if(!user)return;(async()=>{const d=await St.get(`il_d_${user}`);if(d){sR(d.routines||[]);sH(d.history||[]);sCE(d.cEx||[]);sTS(d.ts||{defaultRest:90,criticalMode:true})}else{sR([]);sH([]);sCE([]);sTS({defaultRest:90,criticalMode:true})}const f=await St.get(`il_f_${user}`);sFol(f||[]);const p=await St.gS('il_posts')||[];sP(p);const pr=await St.gS('il_profiles')||{};sAP(pr);sUD(pr[user]||null)})()},[user]);
const sv=useCallback(async(r,h,c,ts)=>{if(!user)return;await St.set(`il_d_${user}`,{routines:r??routs,history:h??hist,cEx:c??cEx,ts:ts??tS})},[user,routs,hist,cEx,tS]);

const auth=async()=>{const{email,username,password,confirmPassword,newPassword}=af;const pr=await St.gS('il_profiles')||{};
if(am==='forgot'){if(!email||!vE(email)){sAE(t.invalidEmail);return}const f=Object.entries(pr).find(([,p])=>p.email===email.toLowerCase());if(!f){sAE(t.resetError);return}if(!newPassword){sAE(t.fillAllFields);return}pr[f[0]]={...pr[f[0]],password:newPassword};await St.sS('il_profiles',pr);sAP(pr);sAS(t.resetSuccess);sAE('');setTimeout(()=>{sAM('login');sAS('');sAF({email:'',username:'',password:'',confirmPassword:'',newPassword:''})},2000);return}
if(am==='register'){if(!email||!username||!password||!confirmPassword){sAE(t.fillAllFields);return}if(!vE(email)){sAE(t.invalidEmail);return}if(password!==confirmPassword){sAE(t.passwordMismatch);return}if(pr[username]){sAE(t.usernameTaken);return}if(Object.values(pr).some(p=>p.email===email.toLowerCase())){sAE(t.emailTaken);return}pr[username]={email:email.toLowerCase(),password,username,joinDate:new Date().toISOString(),bio:'',avatar:null};await St.sS('il_profiles',pr);sAP(pr);sU(username);sUD(pr[username]);await St.set('il_user',username);sAE('');return}
if(!email||!password){sAE(t.fillAllFields);return}const f=Object.entries(pr).find(([,p])=>p.email===email.toLowerCase()&&p.password===password);if(!f){sAE(t.invalidCredentials);return}sU(f[0]);sUD(f[1]);await St.set('il_user',f[0]);sAE('')};
const lo=async()=>{await sv();sU(null);sUD(null);await St.set('il_user',null);sPg('dashboard')};

const sRo=async r=>{let n;if(r.id)n=routs.map(x=>x.id===r.id?r:x);else n=[...routs,{...r,id:uid()}];sR(n);await sv(n);sER(null)};
const dRo=async id=>{const n=routs.filter(r=>r.id!==id);sR(n);await sv(n)};
const stW=r=>{const e=r.exercises.map(eid=>({exerciseId:eid,sets:[{weight:'',reps:'',duration:'',completed:false}]}));sAW({routineId:r.id,routineName:r.name,exercises:e});sWS(Date.now());sRV(0);sPg('workout')};
const stE=()=>{sAW({routineId:null,routineName:t.emptyWorkout,exercises:[]});sWS(Date.now());sRV(0);sPg('workout')};
const aEW=exId=>{if(!aw)return;sAW({...aw,exercises:[...aw.exercises,{exerciseId:exId,sets:[{weight:'',reps:'',duration:'',completed:false}]}]});sSEP(false)};
const rEW=idx=>{if(!aw)return;sAW({...aw,exercises:aw.exercises.filter((_,i)=>i!==idx)})};
const uS=(ei,si,f,v)=>{const ne=[...aw.exercises];ne[ei]={...ne[ei],sets:[...ne[ei].sets]};ne[ei].sets[si]={...ne[ei].sets[si],[f]:v};sAW({...aw,exercises:ne})};
const aS=ei=>{const ne=[...aw.exercises];const ls=ne[ei].sets[ne[ei].sets.length-1];ne[ei]={...ne[ei],sets:[...ne[ei].sets,{weight:ls?.weight||'',reps:ls?.reps||'',duration:'',completed:false}]};sAW({...aw,exercises:ne})};
const rS=(ei,si)=>{const ne=[...aw.exercises];if(ne[ei].sets.length<=1)return;ne[ei]={...ne[ei],sets:ne[ei].sets.filter((_,i)=>i!==si)};sAW({...aw,exercises:ne})};
const cS=(ei,si)=>{uS(ei,si,'completed',true);const rt=routs.find(r=>r.id===aw?.routineId)?.restTimer||tS.defaultRest;sRTS(rt);sSRT(true)};
const hRD=o=>{if(o>0)sRV(v=>v+1);sSRT(false)};
const fW=async()=>{if(!aw)return;const d=Math.floor((Date.now()-ws)/1000);const rec={id:uid(),date:new Date().toISOString(),routineName:aw.routineName,exercises:aw.exercises,duration:d,restViolations:rv};sSA(rec);const nh=[rec,...hist];sH(nh);await sv(routs,nh);sAW(null);sWS(null)};
const cA=()=>{sSA(null);sPg('dashboard')};

const oPC=(wr=null)=>{sPCD({workout:wr||sa,caption:'',photo:null,includeRoutine:true,includeExercises:true,includeDashboard:true});sSPC(true);if(sa)sSA(null)};
const sPost=async()=>{if(!pcd)return;const{workout:w,caption,photo,includeRoutine:ir,includeExercises:ie,includeDashboard:id}=pcd;let tv=0,ts2=0;const mh={};
if(w)w.exercises.forEach(ex=>{const d=allEx.find(e=>e.id===ex.exerciseId);ex.sets.forEach(s=>{if(s.weight&&s.reps){tv+=s.weight*s.reps;ts2++}else if(s.duration)ts2++});if(d)(d.primary||[]).forEach(m=>{mh[m]=(mh[m]||0)+ex.sets.length})});
const po={id:uid(),userId:user,date:new Date().toISOString(),caption,photo,routineName:ir&&w?w.routineName:null,exercises:ie&&w?w.exercises.map(e=>({name:allEx.find(x=>x.id===e.exerciseId)?.name,sets:e.sets.length})):null,stats:id&&w?{totalVol:tv,totalSets:ts2,duration:w.duration,muscleHits:mh}:null,likes:[],comments:[]};
const np=[po,...posts];sP(np);await St.sS('il_posts',np);sSPC(false);sPCD(null);sPg('hub')};
const tLike=async pid=>{const np=posts.map(p=>{if(p.id!==pid)return p;const l=p.likes.includes(user);return{...p,likes:l?p.likes.filter(u=>u!==user):[...p.likes,user]}});sP(np);await St.sS('il_posts',np)};
const aCom=async(pid,txt)=>{if(!txt.trim())return;const np=posts.map(p=>{if(p.id!==pid)return p;return{...p,comments:[...p.comments,{id:uid(),userId:user,text:txt.trim(),date:new Date().toISOString()}]}});sP(np);await St.sS('il_posts',np)};
const delPost=async pid=>{const np=posts.filter(p=>p.id!==pid);sP(np);await St.sS('il_posts',np);sCD(null)};
const delComment=async(pid,cid)=>{const np=posts.map(p=>{if(p.id!==pid)return p;return{...p,comments:p.comments.filter(c=>c.id!==cid)}});sP(np);await St.sS('il_posts',np)};
const tFol=async uid2=>{const nf=fol.includes(uid2)?fol.filter(u=>u!==uid2):[...fol,uid2];sFol(nf);await St.set(`il_f_${user}`,nf)};
const hPU=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>sPCD(p=>({...p,photo:ev.target.result}));r.readAsDataURL(f)};
const aCuEx=async(n,cat,mus)=>{const ex={id:1000+cEx.length,name:n,category:cat,primary:mus,secondary:[],isCustom:true};const nc=[...cEx,ex];sCE(nc);await sv(routs,hist,nc);sSAC(false)};
const gPW=eid=>{for(const w of hist){const ex=w.exercises.find(e=>e.exerciseId===eid);if(ex)return ex.sets.map(s=>({weight:s.weight,reps:s.reps}))}return null};

const dd=useMemo(()=>{const now=new Date();let f=hist;if(dr==='thisWeek')f=hist.filter(w=>new Date(w.date)>=new Date(now-7*864e5));else if(dr==='thisMonth')f=hist.filter(w=>{const d=new Date(w.date);return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear()});
const mh={};let tv=0,ts2=0;const vbd={},ep={};
f.forEach(w=>{const dk=new Date(w.date).toLocaleDateString();let dv=0;w.exercises.forEach(ex=>{const d=allEx.find(e=>e.id===ex.exerciseId);ex.sets.forEach(s=>{const v=(parseFloat(s.weight)||0)*(parseInt(s.reps)||0);tv+=v;dv+=v;ts2++});if(d){(d.primary||[]).forEach(m=>{mh[m]=(mh[m]||0)+ex.sets.length});(d.secondary||[]).forEach(m=>{mh[m]=(mh[m]||0)+Math.ceil(ex.sets.length*0.5)});if(!ep[ex.exerciseId])ep[ex.exerciseId]=[];ep[ex.exerciseId].push({date:w.date,mw:Math.max(...ex.sets.map(s=>parseFloat(s.weight)||0))})}});vbd[dk]=(vbd[dk]||0)+dv});
return{mh,tv,ts:ts2,cnt:f.length,vbd,ep}},[hist,dr,allEx]);

const s={
  input:{width:'100%',padding:'11px 14px',background:C.card,border:`1px solid ${C.border}`,borderRadius:8,color:C.text,fontSize:14,outline:'none',fontFamily:"'Satoshi',sans-serif",boxSizing:'border-box',transition:'border-color 0.2s'},
  si:{width:62,padding:'9px 6px',background:C.card,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,fontSize:14,textAlign:'center',outline:'none',fontFamily:"'Azeret Mono',monospace"},
  lab:{fontSize:10,color:C.textDim,textTransform:'uppercase',letterSpacing:2,marginBottom:6,display:'block',fontFamily:"'Azeret Mono',monospace"},
  pill:a=>({padding:'6px 14px',borderRadius:6,border:'none',background:a?C.accent:C.card,color:a?C.white:C.textMid,fontSize:11,cursor:'pointer',fontWeight:500,whiteSpace:'nowrap',transition:'all 0.15s',fontFamily:"'Satoshi',sans-serif",letterSpacing:0.3}),
  sec:{fontSize:10,color:C.textDim,textTransform:'uppercase',letterSpacing:3,marginBottom:10,marginTop:20,fontFamily:"'Azeret Mono',monospace"},
  cd:{background:C.card,borderRadius:14,padding:16,marginBottom:8,border:`1px solid ${C.border}`,transition:'transform 0.1s'},
  btn:(bg=C.accent)=>({padding:'12px 24px',background:bg,border:'none',borderRadius:8,color:C.white,fontSize:14,fontWeight:600,cursor:'pointer',fontFamily:"'Satoshi',sans-serif",transition:'opacity 0.15s'}),
  bo:{padding:'10px 20px',background:'transparent',border:`1px solid ${C.border}`,borderRadius:8,color:C.textMid,fontSize:13,cursor:'pointer',fontFamily:"'Satoshi',sans-serif"},
  pg:{padding:'0 16px',maxWidth:540,margin:'0 auto'},
};

if(load)return(<div style={{minHeight:'100vh',background:C.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Satoshi:wght@400;500;600;700&family=Azeret+Mono:wght@400;500;600&display=swap" rel="stylesheet"/>
<div style={{color:C.accent,fontSize:14,fontFamily:"'Azeret Mono',monospace",letterSpacing:6,textTransform:'uppercase'}}>IRONLOG</div></div>);

const CSS=`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}@keyframes fadeUp{from{transform:translateY(10px);opacity:0}to{transform:translateY(0);opacity:1}}*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}input:focus{border-color:${C.accent}!important}textarea:focus{border-color:${C.accent}!important}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px}button:active{opacity:.85}`;

// ═══ AUTH ═══
if(!user)return(<div style={{minHeight:'100vh',background:C.bg,color:C.text,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Satoshi:wght@400;500;600;700&family=Azeret+Mono:wght@400;500;600&display=swap" rel="stylesheet"/><style>{CSS}</style>
<div style={{width:'100%',maxWidth:380,animation:'fadeUp 0.5s ease'}}>
<div style={{textAlign:'center',marginBottom:40}}>
<div style={{fontSize:14,letterSpacing:8,color:C.accent,fontFamily:"'Azeret Mono',monospace",textTransform:'uppercase',marginBottom:8}}>IRONLOG</div>
<div style={{fontSize:36,fontWeight:300,fontFamily:"'Instrument Serif',serif",color:C.white,lineHeight:1.1}}>{am==='forgot'?t.resetPassword:am==='register'?t.register:t.login}</div>
<div style={{color:C.textDim,fontSize:11,letterSpacing:3,fontFamily:"'Azeret Mono',monospace",marginTop:6}}>{t.tagline}</div>
</div>
{am!=='forgot'&&<div style={{display:'flex',marginBottom:20,borderRadius:8,overflow:'hidden',border:`1px solid ${C.border}`}}>
<button onClick={()=>{sAM('login');sAE('');sAS('')}} style={{flex:1,padding:11,background:am==='login'?C.accent+'20':C.card,border:'none',color:am==='login'?C.accent:C.textDim,fontWeight:600,cursor:'pointer',fontSize:13,fontFamily:"'Satoshi',sans-serif",borderBottom:am==='login'?`2px solid ${C.accent}`:'2px solid transparent'}}>{t.login}</button>
<button onClick={()=>{sAM('register');sAE('');sAS('')}} style={{flex:1,padding:11,background:am==='register'?C.accent+'20':C.card,border:'none',color:am==='register'?C.accent:C.textDim,fontWeight:600,cursor:'pointer',fontSize:13,fontFamily:"'Satoshi',sans-serif",borderBottom:am==='register'?`2px solid ${C.accent}`:'2px solid transparent'}}>{t.register}</button>
</div>}
{am==='forgot'&&<button onClick={()=>{sAM('login');sAE('');sAS('')}} style={{background:'none',border:'none',color:C.accent,cursor:'pointer',fontSize:13,fontWeight:500,marginBottom:12,display:'flex',alignItems:'center',gap:6,fontFamily:"'Satoshi',sans-serif"}}>{I.arrow} {t.backToLogin}</button>}
<div style={{display:'flex',flexDirection:'column',gap:14}}>
<div><label style={s.lab}>{t.email}</label><input style={s.input} type="email" value={af.email} onChange={e=>sAF({...af,email:e.target.value})} onKeyDown={e=>e.key==='Enter'&&auth()} placeholder="you@email.com"/></div>
{am==='register'&&<div><label style={s.lab}>{t.username}</label><input style={s.input} value={af.username} onChange={e=>sAF({...af,username:e.target.value})}/></div>}
{am!=='forgot'&&<div><label style={s.lab}>{t.password}</label><input type="password" style={s.input} value={af.password} onChange={e=>sAF({...af,password:e.target.value})} onKeyDown={e=>e.key==='Enter'&&auth()}/></div>}
{am==='register'&&<div><label style={s.lab}>{t.confirmPassword}</label><input type="password" style={s.input} value={af.confirmPassword} onChange={e=>sAF({...af,confirmPassword:e.target.value})} onKeyDown={e=>e.key==='Enter'&&auth()}/></div>}
{am==='forgot'&&<div><label style={s.lab}>{t.newPassword}</label><input type="password" style={s.input} value={af.newPassword} onChange={e=>sAF({...af,newPassword:e.target.value})} onKeyDown={e=>e.key==='Enter'&&auth()}/></div>}
</div>
{ae&&<div style={{color:C.danger,fontSize:12,marginTop:10}}>{ae}</div>}
{as2&&<div style={{color:C.success,fontSize:12,marginTop:10}}>{as2}</div>}
<button onClick={auth} style={{...s.btn(),width:'100%',padding:14,fontSize:14,letterSpacing:1,marginTop:16}}>{am==='forgot'?t.sendReset:am==='register'?t.register:t.login}</button>
{am==='login'&&<button onClick={()=>{sAM('forgot');sAE('')}} style={{background:'none',border:'none',color:C.textDim,fontSize:12,cursor:'pointer',marginTop:12,width:'100%',textAlign:'center',fontFamily:"'Satoshi',sans-serif"}}>{t.forgotPassword}</button>}
<div style={{display:'flex',justifyContent:'center',gap:8,marginTop:24}}>
<button onClick={()=>{sL('en');St.set('il_lang','en')}} style={s.pill(lang==='en')}>EN</button>
<button onClick={()=>{sL('fr');St.set('il_lang','fr')}} style={s.pill(lang==='fr')}>FR</button>
</div></div></div>);

// ═══ MODALS ═══
const today=dN(new Date());const todayR=routs.find(r=>r.day===today);

const ExPicker=()=>{if(!sep)return null;const fl=allEx.filter(ex=>(ex.name.toLowerCase().includes(st.toLowerCase()))&&(fc==='all'||ex.category===fc));
return(<div style={{position:'fixed',inset:0,zIndex:500,background:C.bg+'f8',overflow:'auto',padding:16,backdropFilter:'blur(12px)'}}>
<div style={{maxWidth:460,margin:'0 auto'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
<div style={{fontSize:13,letterSpacing:3,color:C.textDim,textTransform:'uppercase',fontFamily:"'Azeret Mono',monospace"}}>{t.selectExercises}</div>
<button onClick={()=>sSEP(false)} style={{background:'none',border:'none',color:C.textDim,cursor:'pointer'}}>{I.x}</button></div>
<input style={{...s.input,marginBottom:10}} placeholder={t.search} value={st} onChange={e=>sST(e.target.value)}/>
<div style={{display:'flex',gap:4,flexWrap:'wrap',marginBottom:12,overflow:'auto'}}>
<button onClick={()=>sFC('all')} style={s.pill(fc==='all')}>All</button>
{CATS.map(c=><button key={c} onClick={()=>sFC(c)} style={s.pill(fc===c)}>{t[c]||c}</button>)}</div>
<div style={{maxHeight:'55vh',overflow:'auto'}}>
{fl.map(ex=>(<button key={ex.id} onClick={()=>{if(ept==='workout')aEW(ex.id);else if(ept==='routine'&&er){const e=er.exercises||[];if(!e.includes(ex.id))sER({...er,exercises:[...e,ex.id]})}sSEP(false);sST('');sFC('all')}}
style={{width:'100%',textAlign:'left',padding:'11px 14px',background:C.card,border:`1px solid ${C.border}`,borderRadius:10,color:C.text,fontSize:13,cursor:'pointer',marginBottom:4,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<div><div style={{fontWeight:500}}>{ex.name}</div><div style={{fontSize:10,color:C.textDim,marginTop:2}}>{(ex.primary||[]).map(m=>t[m]||m).join(', ')}</div></div>
<div style={{fontSize:9,color:C.textDim,textTransform:'uppercase',letterSpacing:1}}>{t[ex.category]||ex.category}</div></button>))}
{fl.length===0&&<div style={{color:C.textDim,textAlign:'center',padding:20}}>{t.noResults}</div>}
</div><button onClick={()=>sSAC(true)} style={{...s.bo,width:'100%',marginTop:8,display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>{I.plus} {t.addCustomExercise}</button>
</div></div>)};

const CustModal=()=>{const[n,setN]=useState('');const[cat,setCat]=useState('other');const[mus,setMus]=useState([]);
return(<div style={{position:'fixed',inset:0,zIndex:600,background:C.bg+'f8',display:'flex',alignItems:'center',justifyContent:'center',padding:20,backdropFilter:'blur(12px)'}}>
<div style={{maxWidth:400,width:'100%',background:C.card,borderRadius:16,padding:24,border:`1px solid ${C.border}`}}>
<div style={{fontSize:13,letterSpacing:3,color:C.textDim,textTransform:'uppercase',fontFamily:"'Azeret Mono',monospace",marginBottom:16}}>{t.addCustomExercise}</div>
<div style={{marginBottom:12}}><label style={s.lab}>{t.exerciseName}</label><input style={s.input} value={n} onChange={e=>setN(e.target.value)}/></div>
<div style={{marginBottom:12}}><label style={s.lab}>{t.muscleGroup}</label><div style={{display:'flex',gap:4,flexWrap:'wrap'}}>{CATS.map(c=><button key={c} onClick={()=>setCat(c)} style={s.pill(cat===c)}>{t[c]||c}</button>)}</div></div>
<div style={{marginBottom:16}}><label style={s.lab}>{t.primaryMuscles}</label><div style={{display:'flex',gap:3,flexWrap:'wrap'}}>{ALL_M.map(m=>(<button key={m} onClick={()=>setMus(mus.includes(m)?mus.filter(x=>x!==m):[...mus,m])} style={{...s.pill(mus.includes(m)),fontSize:10,padding:'3px 8px'}}>{t[m]||m}</button>))}</div></div>
<div style={{display:'flex',gap:8}}><button onClick={()=>sSAC(false)} style={s.bo}>{t.cancel}</button><button onClick={()=>{if(n.trim())aCuEx(n.trim(),cat,mus)}} style={s.btn()}>{t.create}</button></div>
</div></div>)};

const RoutEditor=()=>{if(!er)return null;return(<div style={{position:'fixed',inset:0,zIndex:400,background:C.bg+'f8',overflow:'auto',padding:16,backdropFilter:'blur(12px)'}}>
<div style={{maxWidth:460,margin:'0 auto',paddingBottom:40}}>
<div style={{fontSize:13,letterSpacing:3,color:C.textDim,textTransform:'uppercase',fontFamily:"'Azeret Mono',monospace",marginBottom:16}}>{er.id?t.editRoutine:t.createRoutine}</div>
<div style={{marginBottom:14}}><label style={s.lab}>{t.routineName}</label><input style={s.input} value={er.name||''} onChange={e=>sER({...er,name:e.target.value})}/></div>
<div style={{marginBottom:14}}><label style={s.lab}>{t.assignDay}</label><div style={{display:'flex',gap:4,flexWrap:'wrap'}}>{DAYS.map(d=>(<button key={d} onClick={()=>sER({...er,day:d})} style={s.pill(er.day===d)}>{t[d]?.slice(0,3)}</button>))}</div></div>
<div style={{marginBottom:14}}><label style={s.lab}>{t.restTimerDefault} ({t.seconds})</label><div style={{display:'flex',gap:4,flexWrap:'wrap'}}>{[15,30,45,60,90,120,150,180].map(v=>(<button key={v} onClick={()=>sER({...er,restTimer:v})} style={s.pill(er.restTimer===v)}>{v}s</button>))}</div></div>
<div style={{marginBottom:14}}><label style={s.lab}>{t.exercises}</label>
{(er.exercises||[]).map((eid,idx)=>{const ex=allEx.find(e=>e.id===eid);return(<div key={idx} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'9px 12px',background:C.bg,borderRadius:8,marginBottom:4,border:`1px solid ${C.border}`}}>
<span style={{fontSize:13}}>{ex?.name||'?'}</span>
<button onClick={()=>sER({...er,exercises:er.exercises.filter((_,i)=>i!==idx)})} style={{background:'none',border:'none',color:C.textDim,cursor:'pointer'}}>{I.x}</button></div>)})}
<button onClick={()=>{sEPT('routine');sSEP(true)}} style={{...s.bo,width:'100%',marginTop:4,display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>{I.plus} {t.addExercise}</button></div>
<div style={{display:'flex',gap:8}}>
<button onClick={()=>sER(null)} style={s.bo}>{t.cancel}</button>
<button onClick={()=>sRo(er)} style={s.btn()}>{t.save}</button>
{er.id&&<button onClick={()=>{dRo(er.id);sER(null)}} style={s.btn(C.danger)}>{t.delete}</button>}
</div></div></div>)};

// ═══ POST CARD (render function) ═══
const renderPost=(po)=>{const lk=po.likes.includes(user);const p2=ap[po.userId];const isOwner=po.userId===user;
return(<div key={po.id} style={{...s.cd,padding:0,overflow:'hidden'}}>
<div style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px'}}>
<div style={{cursor:'pointer'}} onClick={()=>sVP(po.userId)}><Av name={po.userId} size={34} photo={p2?.avatar}/></div>
<div style={{flex:1}}><div style={{fontWeight:600,fontSize:13,cursor:'pointer',color:C.text}} onClick={()=>sVP(po.userId)}>{po.userId}</div><div style={{fontSize:10,color:C.textDim,fontFamily:"'Azeret Mono',monospace"}}>{tA(po.date,t)}</div></div>
{po.userId!==user&&<button onClick={()=>tFol(po.userId)} style={{padding:'5px 12px',borderRadius:6,border:'none',background:fol.includes(po.userId)?C.border:C.accent,color:C.white,fontSize:10,cursor:'pointer',fontWeight:600,fontFamily:"'Satoshi',sans-serif"}}>{fol.includes(po.userId)?t.following:t.follow}</button>}
{isOwner&&<button onClick={()=>sCD({type:'post',id:po.id})} style={{background:'none',border:'none',color:C.textDim,cursor:'pointer',padding:4}}>{I.trash}</button>}
</div>
{po.photo&&<img src={po.photo} style={{width:'100%',maxHeight:340,objectFit:'cover'}}/>}
{(po.routineName||po.stats)&&(<div style={{margin:'8px 14px',background:C.bg,borderRadius:10,padding:12,border:`1px solid ${C.border}`}}>
{po.routineName&&<div style={{fontSize:15,fontWeight:300,fontFamily:"'Instrument Serif',serif",color:C.accent}}>{po.routineName}</div>}
{po.exercises&&<div style={{marginTop:6,display:'flex',flexWrap:'wrap',gap:3}}>{po.exercises.map((e,i)=><span key={i} style={{padding:'3px 8px',background:C.card,borderRadius:6,fontSize:10,color:C.textMid,border:`1px solid ${C.border}`}}>{e.name} ×{e.sets}</span>)}</div>}
{po.stats&&(<div style={{display:'flex',gap:16,marginTop:8}}>{[{l:t.totalVolume,v:`${(po.stats.totalVol/1000).toFixed(1)}k`},{l:t.totalSets,v:po.stats.totalSets},{l:t.duration,v:fmtD(po.stats.duration)}].map(({l,v})=>(<div key={l}><div style={{fontSize:9,color:C.textDim,textTransform:'uppercase',fontFamily:"'Azeret Mono',monospace"}}>{l}</div><div style={{fontSize:18,fontWeight:300,fontFamily:"'Instrument Serif',serif",color:C.white}}>{v}</div></div>))}</div>)}
{po.stats?.muscleHits&&<div style={{marginTop:8}}><Heatmap data={po.stats.muscleHits} lang={lang}/></div>}
</div>)}
{po.caption&&<div style={{padding:'6px 14px 10px',fontSize:13,color:C.text,lineHeight:1.5}}><span style={{fontWeight:600,marginRight:6,color:C.accent}}>{po.userId}</span>{po.caption}</div>}
<div style={{padding:'8px 14px',borderTop:`1px solid ${C.border}`,display:'flex',gap:20}}>
<button onClick={()=>tLike(po.id)} style={{background:'none',border:'none',color:lk?'#c05050':C.textDim,cursor:'pointer',display:'flex',alignItems:'center',gap:5,fontSize:12,fontFamily:"'Satoshi',sans-serif"}}>{lk?I.heartFill:I.heart} {po.likes.length}</button>
</div>
<PostComments postId={po.id} comments={po.comments} isOwner={isOwner} commentCount={po.comments.length}/>
</div>)};

const PostComments=({postId,comments,isOwner,commentCount})=>{const[show,setShow]=useState(false);const[ct,sCT]=useState('');
return(<div>
<button onClick={()=>setShow(!show)} style={{width:'100%',padding:'8px 14px',background:'transparent',border:'none',borderTop:`1px solid ${C.border}`,color:C.textDim,cursor:'pointer',textAlign:'left',fontFamily:"'Satoshi',sans-serif",fontSize:12,display:'flex',alignItems:'center',gap:5}}>{I.comment} {commentCount} {show?'▴':'▾'}</button>
{show&&(<div style={{padding:'8px 14px 12px'}}>
{comments.map(c2=>(<div key={c2.id} style={{marginBottom:8,fontSize:12,display:'flex',alignItems:'flex-start',gap:6}}>
<div style={{flex:1}}><span style={{fontWeight:600,color:C.accent,marginRight:5,cursor:'pointer'}} onClick={()=>sVP(c2.userId)}>{c2.userId}</span><span style={{color:C.text}}>{c2.text}</span><span style={{color:C.textDim,fontSize:10,marginLeft:6}}>{tA(c2.date,t)}</span></div>
{(c2.userId===user||isOwner)&&<button onClick={()=>sCD({type:'comment',postId:postId,id:c2.id})} style={{background:'none',border:'none',color:C.textDim,cursor:'pointer',flexShrink:0,padding:2}}>{I.trash}</button>}
</div>))}
<div style={{display:'flex',gap:6,marginTop:6}}>
<input style={{...s.input,fontSize:12,padding:'8px 10px'}} placeholder={t.writeComment} value={ct} onChange={e=>sCT(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){aCom(postId,ct);sCT('')}}}/>
<button onClick={()=>{aCom(postId,ct);sCT('')}} style={{background:C.accent,border:'none',borderRadius:8,color:C.white,cursor:'pointer',padding:'8px 12px',display:'flex',alignItems:'center'}}>{I.send}</button>
</div></div>)}
</div>)};

const PostCreator=()=>{if(!spc||!pcd)return null;const d=pcd;
return(<div style={{position:'fixed',inset:0,zIndex:700,background:C.bg+'f8',overflow:'auto',padding:16,backdropFilter:'blur(12px)'}}>
<div style={{maxWidth:460,margin:'0 auto',paddingBottom:40}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
<div style={{fontSize:13,letterSpacing:3,color:C.textDim,textTransform:'uppercase',fontFamily:"'Azeret Mono',monospace"}}>{t.postWorkout}</div>
<button onClick={()=>{sSPC(false);sPCD(null)}} style={{background:'none',border:'none',color:C.textDim,cursor:'pointer'}}>{I.x}</button></div>
<div style={{...s.cd,textAlign:'center',border:`1px dashed ${C.borderLight}`,minHeight:160,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden'}}>
{d.photo?(<><img src={d.photo} style={{width:'100%',height:220,objectFit:'cover',borderRadius:10}}/><button onClick={()=>sPCD({...d,photo:null})} style={{position:'absolute',top:8,right:8,background:C.bg+'cc',border:'none',color:C.textMid,borderRadius:8,width:32,height:32,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>{I.x}</button></>):(
<div style={{display:'flex',gap:10}}>
<button onClick={()=>cR.current?.click()} style={{...s.btn(),display:'flex',alignItems:'center',gap:6,fontSize:13}}>{I.camera} {t.takePhoto}</button>
<button onClick={()=>fR.current?.click()} style={{...s.bo,display:'flex',alignItems:'center',gap:6}}>{I.image} {t.uploadPhoto}</button>
</div>)}
<input ref={cR} type="file" accept="image/*" capture="environment" style={{display:'none'}} onChange={hPU}/>
<input ref={fR} type="file" accept="image/*" style={{display:'none'}} onChange={hPU}/>
</div>
<textarea value={d.caption} onChange={e=>sPCD({...d,caption:e.target.value})} placeholder={t.writeCaption} style={{...s.input,minHeight:70,resize:'vertical',marginTop:10,marginBottom:10}}/>
{d.workout&&<div style={{display:'flex',flexDirection:'column',gap:6,marginBottom:14}}>
{[{k:'includeRoutine',l:t.includeRoutine},{k:'includeExercises',l:t.includeExercises},{k:'includeDashboard',l:t.includeDashboard}].map(({k,l})=>(
<div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 14px',background:C.card,borderRadius:8,border:`1px solid ${C.border}`}}>
<span style={{fontSize:12,color:C.textMid}}>{l}</span>
<button onClick={()=>sPCD({...d,[k]:!d[k]})} style={{padding:'4px 14px',background:d[k]?C.accent:C.border,border:'none',borderRadius:6,color:C.white,fontWeight:600,cursor:'pointer',fontSize:11,transition:'all 0.15s'}}>{d[k]?t.on:t.off}</button>
</div>))}</div>}
<button onClick={sPost} style={{...s.btn(),width:'100%',padding:14,fontSize:14,letterSpacing:1}}>{t.post}</button>
</div></div>)};

const ProfileModal=()=>{if(!vp)return null;const p=ap[vp];if(!p)return null;const uPosts=posts.filter(po=>po.userId===vp);const isMe=vp===user;const iF=fol.includes(vp);
return(<div style={{position:'fixed',inset:0,zIndex:600,background:C.bg+'f8',overflow:'auto',padding:16,backdropFilter:'blur(12px)'}}>
<div style={{maxWidth:460,margin:'0 auto',paddingBottom:40}}>
<button onClick={()=>sVP(null)} style={{background:'none',border:'none',color:C.textDim,cursor:'pointer',marginBottom:12}}>{I.x}</button>
<div style={{textAlign:'center',marginBottom:20}}>
<Av name={vp} size={64} photo={p.avatar}/>
<div style={{fontSize:24,fontWeight:300,fontFamily:"'Instrument Serif',serif",color:C.white,marginTop:10}}>{vp}</div>
{p.bio&&<div style={{color:C.textDim,fontSize:12,marginTop:4}}>{p.bio}</div>}
<div style={{color:C.textDim,fontSize:10,marginTop:4,fontFamily:"'Azeret Mono',monospace"}}>{t.memberSince} {new Date(p.joinDate).toLocaleDateString()}</div>
{!isMe&&<button onClick={()=>tFol(vp)} style={{...s.btn(iF?C.border:C.accent),marginTop:12,fontSize:12,padding:'8px 24px'}}>{iF?t.unfollow:t.follow}</button>}
</div>
{uPosts.map(po=>renderPost(po))}
</div></div>)};

const ConfirmDel=()=>{if(!cd)return null;
return(<div style={{position:'fixed',inset:0,zIndex:800,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
<div style={{background:C.card,borderRadius:16,padding:24,maxWidth:320,width:'100%',border:`1px solid ${C.border}`,textAlign:'center'}}>
<div style={{fontSize:15,color:C.text,marginBottom:16,fontFamily:"'Satoshi',sans-serif"}}>{t.confirmDelete}</div>
<div style={{display:'flex',gap:10,justifyContent:'center'}}>
<button onClick={()=>sCD(null)} style={s.bo}>{t.no}</button>
<button onClick={()=>{if(cd.type==='post')delPost(cd.id);else if(cd.type==='comment')delComment(cd.postId,cd.id);sCD(null)}} style={s.btn(C.danger)}>{t.yes}</button>
</div></div></div>)};

// ═══ PAGES ═══
const Dash=()=>(<div style={s.pg}>
<div style={{marginBottom:16,paddingTop:6}}>
<div style={{fontSize:11,color:C.textDim,fontFamily:"'Azeret Mono',monospace",letterSpacing:2}}>{t.welcomeBack}</div>
<div style={{fontSize:28,fontWeight:300,fontFamily:"'Instrument Serif',serif",color:C.white}}>{user}</div>
<div style={{fontSize:11,color:C.textDim,marginTop:2,fontFamily:"'Azeret Mono',monospace"}}>5'6" · 176 lbs</div>
</div>
{todayR?(<div style={{...s.cd,background:`linear-gradient(135deg,${C.accent}15,${C.accentDim}10)`,border:`1px solid ${C.accent}30`}}>
<div style={{fontSize:9,color:C.accent,fontFamily:"'Azeret Mono',monospace",letterSpacing:2,textTransform:'uppercase'}}>{t.todayRoutine} — {t[today]}</div>
<div style={{fontSize:22,fontWeight:300,fontFamily:"'Instrument Serif',serif",color:C.white,marginTop:4}}>{todayR.name}</div>
<div style={{fontSize:11,color:C.textMid,marginTop:3}}>{todayR.exercises.length} {t.exercises.toLowerCase()}</div>
<button onClick={()=>stW(todayR)} style={{...s.btn(),width:'100%',marginTop:12,letterSpacing:1}}>{t.startWorkout}</button>
</div>):(<div style={{...s.cd,textAlign:'center'}}><div style={{color:C.textDim,marginBottom:10,fontSize:13}}>{t.noRoutineToday}</div><button onClick={stE} style={s.btn()}>{t.emptyWorkout}</button></div>)}
{hist.length>0?(<>
<div style={{display:'flex',gap:4,marginTop:16,marginBottom:12}}>{['thisWeek','thisMonth','allTime'].map(r=>(<button key={r} onClick={()=>sDR(r)} style={s.pill(dr===r)}>{t[r]}</button>))}</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8,marginBottom:12}}>
{[{l:t.workoutsCompleted,v:dd.cnt,c:C.accent},{l:t.totalVolume,v:`${(dd.tv/1000).toFixed(1)}k`,c:C.success},{l:t.totalSets,v:dd.ts,c:C.accentDim},{l:t.musclesWorked,v:Object.keys(dd.mh).length,c:'#8b7ea0'}].map(({l,v,c})=>(<div key={l} style={s.cd}><div style={{fontSize:9,color:C.textDim,textTransform:'uppercase',letterSpacing:1.5,marginBottom:2,fontFamily:"'Azeret Mono',monospace"}}>{l}</div><div style={{fontSize:28,fontWeight:300,color:c,fontFamily:"'Instrument Serif',serif"}}>{v}</div></div>))}
</div>
<div style={s.sec}>{t.muscleHeatmap}</div><div style={s.cd}><Heatmap data={dd.mh} lang={lang}/></div>
<div style={s.sec}>{t.volumeTrend}</div>
<div style={s.cd}>{(()=>{const e=Object.entries(dd.vbd).slice(-14);if(!e.length)return(<div style={{color:C.textDim,textAlign:'center'}}>—</div>);const mx=Math.max(...e.map(([,v])=>v),1);return(<div style={{display:'flex',alignItems:'flex-end',gap:3,height:80}}>{e.map(([d,v])=>(<div key={d} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center'}}><div style={{width:'100%',background:`linear-gradient(to top,${C.accent},${C.accentLight})`,borderRadius:'3px 3px 0 0',height:`${(v/mx)*64}px`,minHeight:2,transition:'height 0.3s'}}/><div style={{fontSize:7,color:C.textDim,marginTop:3,transform:'rotate(-45deg)'}}>{d.split('/').slice(0,2).join('/')}</div></div>))}</div>)})()}</div>
<div style={s.sec}>{t.progressiveOverload}</div>
{Object.entries(dd.ep).slice(0,5).map(([eid,data])=>{const ex=allEx.find(e=>e.id===parseInt(eid));if(!ex||data.length<2)return null;const f=data[data.length-1].mw,l=data[0].mw,diff=l-f;return(<div key={eid} style={{...s.cd,display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{fontSize:13,fontWeight:500}}>{ex.name}</div><div style={{fontSize:10,color:C.textDim}}>{t.lastSession}: {l} {t.lbs}</div></div><div style={{color:diff>0?C.success:diff<0?C.danger:C.textDim,fontWeight:500,fontSize:15,fontFamily:"'Azeret Mono',monospace"}}>{diff>0?'+':''}{diff}</div></div>)})}
<div style={s.sec}>{t.recentWorkouts}</div>
{hist.slice(0,5).map(w=>(<div key={w.id} style={s.cd}><div style={{display:'flex',justifyContent:'space-between'}}><div style={{fontWeight:500,fontSize:14}}>{w.routineName}</div><div style={{fontSize:10,color:C.textDim,fontFamily:"'Azeret Mono',monospace"}}>{new Date(w.date).toLocaleDateString()}</div></div><div style={{fontSize:11,color:C.textDim,marginTop:3}}>{w.exercises.length} {t.exercises.toLowerCase()} · {fmtD(w.duration)} · {w.exercises.reduce((x,e)=>x+e.sets.length,0)} {t.sets.toLowerCase()}</div></div>))}
</>):(<div style={{...s.cd,textAlign:'center',color:C.textDim,marginTop:16,fontStyle:'italic',fontFamily:"'Instrument Serif',serif"}}>{t.noHistory}</div>)}
</div>);

const Routs=()=>(<div style={s.pg}>
<div style={s.sec}>{t.routines}</div>
{routs.length===0&&<div style={{...s.cd,textAlign:'center',color:C.textDim,fontStyle:'italic',fontFamily:"'Instrument Serif',serif"}}>{t.noRoutines}</div>}
{routs.map(r=>(<div key={r.id} style={s.cd}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
<div><div style={{fontWeight:300,fontSize:18,fontFamily:"'Instrument Serif',serif",color:C.white}}>{r.name}</div><div style={{fontSize:10,color:C.accent,marginTop:2,fontFamily:"'Azeret Mono',monospace"}}>{t[r.day]||'—'} · {r.restTimer||tS.defaultRest}s</div><div style={{fontSize:11,color:C.textDim,marginTop:4}}>{r.exercises.map(eid=>allEx.find(e=>e.id===eid)?.name).filter(Boolean).join(' · ')}</div></div>
<button onClick={()=>sER({...r})} style={{background:'none',border:'none',color:C.textDim,cursor:'pointer'}}>{I.edit}</button>
</div>
<button onClick={()=>stW(r)} style={{...s.btn(),width:'100%',marginTop:12,letterSpacing:1}}>{t.startWorkout}</button>
</div>))}
<button onClick={()=>sER({name:'',day:today,exercises:[],restTimer:tS.defaultRest})} style={{...s.bo,width:'100%',marginTop:6,display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>{I.plus} {t.createRoutine}</button>
</div>);

const Wrk=()=>{if(!aw)return(<div style={s.pg}><div style={{...s.cd,textAlign:'center',color:C.textDim,fontStyle:'italic',fontFamily:"'Instrument Serif',serif"}}>{t.selectRoutine}</div></div>);
return(<div style={s.pg}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
<div><div style={{fontSize:22,fontWeight:300,fontFamily:"'Instrument Serif',serif",color:C.white}}>{aw.routineName}</div><Timer start={ws}/></div></div>
{aw.exercises.map((ex,ei)=>{const dbEx=allEx.find(e=>e.id===ex.exerciseId);const prev=gPW(ex.exerciseId);const ic=dbEx?.isCardio;return(<div key={ei} style={s.cd}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
<div><div style={{fontWeight:500,fontSize:14}}>{dbEx?.name||'?'}</div><div style={{fontSize:10,color:C.textDim}}>{(dbEx?.primary||[]).map(m=>t[m]||m).join(', ')}</div>{prev&&<div style={{fontSize:10,color:C.accent,marginTop:1}}>{t.prevWeights}: {prev.map(x=>`${x.weight}×${x.reps}`).join(', ')}</div>}</div>
<button onClick={()=>rEW(ei)} style={{background:'none',border:'none',color:C.textDim,cursor:'pointer'}}>{I.x}</button></div>
{ex.sets.map((se,si)=>(<div key={si} style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
<span style={{width:22,fontSize:10,color:C.textDim,fontFamily:"'Azeret Mono',monospace"}}>{si+1}</span>
{ic?<input style={s.si} placeholder={t.mins} type="number" value={se.duration||''} onChange={e=>uS(ei,si,'duration',e.target.value)}/>:(<><input style={s.si} placeholder={t.lbs} type="number" value={se.weight||''} onChange={e=>uS(ei,si,'weight',e.target.value)}/><span style={{color:C.textDim,fontSize:10}}>×</span><input style={s.si} placeholder={t.reps} type="number" value={se.reps||''} onChange={e=>uS(ei,si,'reps',e.target.value)}/></>)}
{!se.completed?<button onClick={()=>cS(ei,si)} style={{padding:'5px 10px',background:C.accent,border:'none',borderRadius:6,color:C.white,cursor:'pointer',display:'flex',alignItems:'center'}}>{I.check}</button>:<span style={{color:C.success,display:'flex',alignItems:'center'}}>{I.check}</span>}
{ex.sets.length>1&&<button onClick={()=>rS(ei,si)} style={{background:'none',border:'none',color:C.textDim,cursor:'pointer',padding:2}}>{I.x}</button>}
</div>))}
<button onClick={()=>aS(ei)} style={{...s.bo,width:'100%',marginTop:4,fontSize:11,padding:7,display:'flex',alignItems:'center',justifyContent:'center',gap:4}}>{I.plus} {t.addSet}</button>
</div>)})}
<button onClick={()=>{sEPT('workout');sSEP(true)}} style={{...s.bo,width:'100%',marginBottom:10,display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>{I.plus} {t.addExercise}</button>
<div style={{display:'flex',gap:8}}>
<button onClick={()=>{sAW(null);sWS(null);sPg('dashboard')}} style={{...s.btn(C.danger),flex:1}}>{t.cancelWorkout}</button>
<button onClick={fW} style={{...s.btn(),flex:2,letterSpacing:1}}>{t.finishWorkout}</button>
</div></div>)};

const Hub=()=>{const fp=hf==='following'?posts.filter(p=>fol.includes(p.userId)||p.userId===user):posts;
return(<div style={s.pg}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
<div style={{fontSize:13,letterSpacing:3,color:C.textDim,textTransform:'uppercase',fontFamily:"'Azeret Mono',monospace"}}>{t.socialHub}</div>
<button onClick={()=>oPC(hist[0])} style={{...s.btn(),fontSize:12,padding:'8px 16px',display:'flex',alignItems:'center',gap:6}}>{I.plus} {t.post}</button></div>
<div style={{display:'flex',gap:4,marginBottom:14}}><button onClick={()=>sHF('all')} style={s.pill(hf==='all')}>{t.feedAll}</button><button onClick={()=>sHF('following')} style={s.pill(hf==='following')}>{t.feedFollowing}</button></div>
{fp.length===0?(<div style={{...s.cd,textAlign:'center',color:C.textDim,padding:40,fontStyle:'italic',fontFamily:"'Instrument Serif',serif"}}>{t.noPostsYet}</div>):fp.map(p=>renderPost(p))}
</div>)};

const Sett=()=>(<div style={s.pg}>
<div style={s.sec}>{t.settings}</div>
<div style={s.cd}><label style={s.lab}>{t.language}</label><div style={{display:'flex',gap:6,marginTop:6}}><button onClick={()=>{sL('en');St.set('il_lang','en')}} style={s.pill(lang==='en')}>English</button><button onClick={()=>{sL('fr');St.set('il_lang','fr')}} style={s.pill(lang==='fr')}>Français</button></div></div>
<div style={s.cd}><label style={s.lab}>{t.restBetweenSets} ({t.seconds})</label><div style={{display:'flex',gap:4,flexWrap:'wrap',marginTop:6}}>{[15,30,45,60,90,120,150,180,240,300].map(v=>(<button key={v} onClick={async()=>{const ts={...tS,defaultRest:v};sTS(ts);await sv(routs,hist,cEx,ts)}} style={s.pill(tS.defaultRest===v)}>{v}s</button>))}</div></div>
<div style={s.cd}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><label style={s.lab}>{t.criticalMode}</label><div style={{fontSize:11,color:C.textDim,marginTop:3}}>{t.criticalModeDesc}</div></div><button onClick={async()=>{const ts={...tS,criticalMode:!tS.criticalMode};sTS(ts);await sv(routs,hist,cEx,ts)}} style={{padding:'6px 16px',background:tS.criticalMode?C.accent:C.border,border:'none',borderRadius:6,color:C.white,fontWeight:600,cursor:'pointer',fontSize:11}}>{tS.criticalMode?t.on:t.off}</button></div></div>
<div style={s.cd}><div style={{...s.sec,marginTop:0}}>{t.customExercises}</div>{cEx.length===0&&<div style={{color:C.textDim,fontSize:12,fontStyle:'italic'}}>—</div>}{cEx.map(ex=>(<div key={ex.id} style={{padding:'7px 0',borderBottom:`1px solid ${C.border}`,fontSize:13}}>{ex.name} <span style={{color:C.textDim,fontSize:10}}>({t[ex.category]||ex.category})</span></div>))}<button onClick={()=>sSAC(true)} style={{...s.bo,width:'100%',marginTop:8,display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>{I.plus} {t.addCustomExercise}</button></div>
<button onClick={lo} style={{...s.btn(C.danger),width:'100%',marginTop:14,letterSpacing:1}}>{t.logout}</button>
</div>);

return(<div style={{minHeight:'100vh',background:C.bg,color:C.text,fontFamily:"'Satoshi',sans-serif",paddingBottom:72}}>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Satoshi:wght@400;500;600;700&family=Azeret+Mono:wght@400;500;600&display=swap" rel="stylesheet"/><style>{CSS}</style>
<div style={{padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:`1px solid ${C.border}`}}>
<div style={{fontSize:12,letterSpacing:5,color:C.accent,fontFamily:"'Azeret Mono',monospace"}}>IRONLOG</div>
<div style={{display:'flex',gap:8,alignItems:'center'}}>
<div style={{cursor:'pointer'}} onClick={()=>sVP(user)}><Av name={user} size={28}/></div>
<button onClick={()=>{sL(lang==='en'?'fr':'en');St.set('il_lang',lang==='en'?'fr':'en')}} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:6,color:C.textDim,padding:'3px 8px',fontSize:10,cursor:'pointer',fontWeight:500,fontFamily:"'Azeret Mono',monospace"}}>{lang==='en'?'FR':'EN'}</button>
</div></div>
<div key={pg} style={{animation:'fadeUp 0.25s ease'}}>
{pg==='dashboard'&&<Dash/>}{pg==='routines'&&<Routs/>}{pg==='workout'&&<Wrk/>}{pg==='hub'&&<Hub/>}{pg==='settings'&&<Sett/>}
</div>
<div style={{position:'fixed',bottom:0,left:0,right:0,zIndex:100,background:`${C.bg}ee`,borderTop:`1px solid ${C.border}`,display:'flex',justifyContent:'space-around',padding:'8px 0',backdropFilter:'blur(16px)'}}>
{[{k:'dashboard',i:I.dashboard,l:t.dashboard},{k:'routines',i:I.routines,l:t.routines},{k:'workout',i:I.workout,l:t.workout},{k:'hub',i:I.hub,l:t.hub},{k:'settings',i:I.settings,l:t.settings}].map(({k,i,l})=>(
<button key={k} onClick={()=>sPg(k)} style={{background:'none',border:'none',color:pg===k?C.accent:C.textDim,display:'flex',flexDirection:'column',alignItems:'center',gap:3,cursor:'pointer',padding:'2px 10px',transition:'color 0.2s'}}>
<span style={{opacity:pg===k?1:0.5,transition:'opacity 0.2s'}}>{i}</span>
<span style={{fontSize:9,fontFamily:"'Azeret Mono',monospace",letterSpacing:1}}>{l}</span>
</button>))}
</div>
{srt&&<RestOverlay seconds={rts} onSkip={()=>sSRT(false)} onDone={hRD} critical={tS.criticalMode} lang={lang}/>}
{sa&&<Analysis data={sa} exDB={allEx} lang={lang} onClose={cA} onShare={()=>oPC()}/>}
<RoutEditor/><ExPicker/>{sac&&<CustModal/>}<PostCreator/><ProfileModal/><ConfirmDel/>
</div>)}
