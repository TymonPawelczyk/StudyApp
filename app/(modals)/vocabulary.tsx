import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mockVocabularyBank } from "../../data/mockData";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function VocabularyModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const items = useMemo(() => shuffle(mockVocabularyBank), []);
  const current = items[index % items.length];
  const opts = useMemo(() => shuffle(current.options).slice(0, 4), [current]);

  useEffect(() => {
    setSelected(null);
    setFeedback(null);
  }, [index]);

  const onPick = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    const isCorrect = opt === current.correct;
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((s) => s + 1);
  };

  const next = () => setIndex((i) => i + 1);

  return (
    <SafeAreaView style={styles.container}>
      {/* Modal Header with Close */}
      <View style={styles.modalHeader}>
        <View style={styles.dragHandle} />
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={22} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Vocabulary</Text>
      </View>
      <View style={styles.scoreBadge}>
        <Ionicons name="trophy" size={16} color="#0f172a" />
        <Text style={styles.scoreText}>{score}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.wordLabel}>English word</Text>
        <Text style={styles.word}>{current.word}</Text>
      </View>

      <View style={styles.options}>
        {opts.map((opt) => {
          const isSelected = selected === opt;
          const isCorrect = feedback && opt === current.correct;
          const isWrong =
            feedback === "wrong" && isSelected && opt !== current.correct;
          const bg = isCorrect ? "#22c55e" : isWrong ? "#ef4444" : "#1e293b";
          const border = isSelected ? "#334155" : "#334155";
          return (
            <TouchableOpacity
              key={opt}
              style={[
                styles.option,
                { backgroundColor: bg, borderColor: border },
              ]}
              onPress={() => onPick(opt)}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={next}
          disabled={!feedback}
        >
          <Text style={styles.primaryButtonText}>
            {feedback ? "Next" : "Select an answer"}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 24,
  },
  modalHeader: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#334155",
    borderRadius: 2,
  },
  closeBtn: {
    position: "absolute",
    right: 0,
    top: -6,
    padding: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#f1f5f9",
  },
  scoreBadge: {
    backgroundColor: "#c0f000",
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 6,
  },
  scoreText: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "900",
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 20,
  },
  wordLabel: {
    fontSize: 12,
    color: "#94a3b8",
    marginBottom: 6,
  },
  word: {
    fontSize: 28,
    fontWeight: "800",
    color: "#f1f5f9",
  },
  options: {
    gap: 12,
    marginTop: 8,
  },
  option: {
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1.5,
    borderColor: "#334155",
    alignItems: "center",
  },
  optionText: {
    color: "#f1f5f9",
    fontSize: 16,
    fontWeight: "700",
  },
  actions: {
    marginTop: 24,
  },
  primaryButton: {
    backgroundColor: "#c0f000",
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryButtonText: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
