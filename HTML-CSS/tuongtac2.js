class Node2 {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class Teacher {
    constructor(nameT, IDT, numeberT, in4T) {
        this.IDT = IDT;
        this.nameT = nameT;
        this.numeberT = numeberT;
        this.in4T = in4T;
    }
}

class TeacherLinkedList {
    constructor() {
        this.head = JSON.parse(localStorage.getItem('teacherList')) || null;
    }

    append(teacher) {
        const newNode = new Node2(teacher);
        if (!this.head) {
            this.head = newNode;
            localStorage.setItem('teacherList', JSON.stringify(this.head));
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
        localStorage.setItem('teacherList', JSON.stringify(this.head));
    }

    addItemFromPromptT() {
        const nameT = prompt("Nhập tên giáo viên:");
        const IDT = parseInt(prompt("Nhập mã giáo viên:"));
        const numeberT = prompt("Nhập số điện thoại:");
        const in4T = prompt("Nhập thông tin giáo viên:");
        const newTeacher = new Teacher(nameT, IDT, numeberT, in4T);
        this.append(newTeacher);
    }
    sortTeachersByID() {
        if (!this.head || !this.head.next) {
            return;
        }

        let current = this.head;
        let swapped;
        let temp;

        do {
            swapped = false;
            current = this.head;

            while (current.next) {
                if (current.data.IDT > current.next.data.IDT) {
                    temp = current.data;
                    current.data = current.next.data;
                    current.next.data = temp;
                    swapped = true;
                }
                current = current.next;
            }
        } while (swapped);
    }

    printToWindowT() {
        if (!this.head) {
            document.getElementById("teacherOutput").innerHTML = "Chưa cập nhật danh sách!";
            return;
        }

        this.sortTeachersByID();
        let current = this.head;
        let output = "<table border='1'><tr><th>Tên giáo viên</th><th>Mã số giáo viên</th><th>Số điện thoại</th><th>Thông tin quản lý</th></tr>";
        while (current) {
            output += `<tr><td>${current.data.nameT}</td><td>${current.data.IDT}</td><td>${current.data.numeberT}</td><td>${current.data.in4T}</td></tr>`;
            current = current.next;
        }
        output += "</table>";
        document.getElementById("teacherOutput").innerHTML = output;
    }

    deleteTeacherByID() {
        const teacherID = window.prompt("Nhập ID giáo viên cần xóa:");
        if (!teacherID) {
            return;
        }

        let current = this.head;
        let prev = null;

        while (current && current.data.IDT !== parseInt(teacherID)) {
            prev = current;
            current = current.next;
        }

        if (!current) {
            document.getElementById("updateStatus").innerHTML = "Không tìm thấy giáo viên có ID: " + teacherID;
            return;
        }
        if (!prev) {
            this.head = current.next;
        } else {
            prev.next = current.next;
        }
        localStorage.setItem('teacherList', JSON.stringify(this.head));
        document.getElementById("updateStatus").innerHTML = "Cập nhật thành công";
    }

    SearchForNameT() {
        const TeacherName = window.prompt("Nhập tên giáo viên cần tìm kiếm:");
        let current = this.head;
        while (current !== null) {
            if (current.data.nameT === TeacherName) {
                const TeacherInfo = `
                    Tên: ${current.data.nameT} 
                    Số ID: ${current.data.IDT} 
                    Số điện thoại: ${current.data.numeberT} 
                    Thông tin: ${current.data.in4T}
                `;
                const cleanTeacherInfo = TeacherInfo.replace(/<br>/g, ' ');
                window.alert(TeacherInfo);
                return;
            }
            current = current.next;
        }
        window.alert(`Không tìm thấy giáo viên có tên: ${TeacherName}`);
    }
    searchForIDT() {
        const TeacherID = parseInt(window.prompt("Nhập ID giáo viên cần tìm kiếm:"));
        let current = this.head;
        while (current !== null) {
            if (current.data.IDT === TeacherID) {
                const TeacherInfo = `
                    Tên: ${current.data.nameT} 
                    Số ID: ${current.data.IDT} 
                    Số điện thoại: ${current.data.numeberT} 
                    Thông tin: ${current.data.in4T}
                `;
                window.alert(TeacherInfo);
                return;
            }
            current = current.next;
        }
        window.alert(`Không tìm thấy giáo viên có ID: ${TeacherID}`);
    }

}

const teacherLinkedList = new TeacherLinkedList();
