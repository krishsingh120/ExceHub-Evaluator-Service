import CppExecutor from "../containers/cppExecutor";
import JavaExecutor from "../containers/javaExecutor";
import PythonExecutor from "../containers/pythonExecutor";
import CodeExecutorStrategy from "../types/CodeExecutorStrategy";

export default function codeExecutor(codeLanguage: string): CodeExecutorStrategy | null {
    if (codeLanguage === "JAVA") {
        return new JavaExecutor();
    } else if (codeLanguage === "PYTHON") {
        return new PythonExecutor();
    } else if (codeLanguage === "CPP") {
        return new CppExecutor();
    } else {
        return null;
    }
}
