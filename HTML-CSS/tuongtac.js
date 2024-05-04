class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class Student {
    constructor(name, age, address, heath, ID, name2, numberphone, job) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.heath = heath;
        this.ID = ID;
        this.name2 = name2;
        this.numberphone = numberphone;
        this.job = job;
    }
}
class StudentLinkedList {
    constructor() {
        this.head = JSON.parse(localStorage.getItem('studentList')) || null;
    }

    append(student) {
        const newNode = new Node(student);
        if (!this.head) {
            this.head = newNode;
            localStorage.setItem('studentList', JSON.stringify(this.head));
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
        localStorage.setItem('studentList', JSON.stringify(this.head));
    }

    addItemFromPrompt() {
        const name = prompt("Nhập tên học sinh:");
        const ID = prompt("Nhập số ID:");
        const age = parseInt(prompt("Nhập tuổi học sinh:"));
        const address = prompt("Nhập địa chỉ:");
        const heath = prompt("Nhập tình trạng sức khỏe:");
        const name2 = prompt("Nhập tên phụ huynh học sinh:");
        const numberphone = prompt("Nhập số điện thoại:");
        const job = prompt("Nhập nghề nghiệp:");
        const newStudent = new Student(name, age, address, heath, ID, name2, numberphone, job);
        this.append(newStudent);
    }

    sortStudentsByID() {
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
                if (current.data.ID > current.next.data.ID) {
                    temp = current.data;
                    current.data = current.next.data;
                    current.next.data = temp;
                    swapped = true;
                }
                current = current.next;
            }
        } while (swapped);
    }

    printToWindow() {
        if (!this.head) {
            document.getElementById("studentOutput").innerHTML = "Chưa cập nhật danh sách!";
            return;
        }

        this.sortStudentsByID();
        let current = this.head;
        let output = "<table border='1'><tr><th>Tên</th><th>ID</th><th>Tuổi</th><th>Địa chỉ</th><th>Sức khỏe</th><th>Tên phụ huynh</th><th>Số điện thoại</th><th>Nghề Nghiệp</th></tr>";
        while (current) {
            output += `<tr><td>${current.data.name}</td><td>${current.data.ID}</td><td>${current.data.age}</td><td>${current.data.address}</td><td>${current.data.heath}</td><td>${current.data.name2}</td><td>${current.data.numberphone}</td><td>${current.data.job}</td></tr>`;
            current = current.next;
        }
        output += "</table>";
        document.getElementById("studentOutput").innerHTML = output;
    }

    deleteStudentByID() {
        const studentID = window.prompt("Nhập ID học sinh cần xóa:");
        if (!studentID) {
            return;
        }

        let current = this.head;
        let prev = null;

        while (current && current.data.ID !== studentID) {
            prev = current;
            current = current.next;
        }

        if (!current) {
            document.getElementById("updateStatus").innerHTML = "Không tìm thấy học sinh có ID: " + studentID;
            return;
        }
        if (!prev) {
            this.head = current.next;
        } else {
            prev.next = current.next;
        }
        localStorage.setItem('studentList', JSON.stringify(this.head));
        document.getElementById("updateStatus").innerHTML = "Cập nhật thành công";
    }

    searchForName() {
        const studentName = window.prompt("Nhập tên học sinh cần tìm kiếm:");
        let current = this.head;
        while (current !== null) {
            if (current.data.name === studentName) {
                const studentInfo = `
                    Tên: ${current.data.name} 
                    Tuổi: ${current.data.age} 
                    Địa chỉ: ${current.data.address} 
                    Tình trạng sức khỏe: ${current.data.heath} 
                    Số ID: ${current.data.ID} 
                    Tên phụ huynh: ${current.data.name2} 
                    Số điện thoại: ${current.data.numberphone} 
                    Nghề nghiệp: ${current.data.job} 
                `;
                window.alert(studentInfo);
                return;
            }
            current = current.next;
        }
        window.alert(`Không tìm thấy học sinh có tên: ${studentName}`);
    }

    searchForID() {
        const studentID = window.prompt("Nhập ID học sinh cần tìm kiếm:");
        let current = this.head;
        while (current !== null) {
            if (current.data.ID === studentID) {
                const studentInfo = `
                    Tên: ${current.data.name} 
                    Tuổi: ${current.data.age} 
                    Địa chỉ: ${current.data.address} 
                    Tình trạng sức khỏe: ${current.data.heath} 
                    Số ID: ${current.data.ID} 
                    Tên phụ huynh: ${current.data.name2} 
                    Số điện thoại: ${current.data.numberphone} 
                    Nghề nghiệp: ${current.data.job} 
                `;
                window.alert(studentInfo);
                return;
            }
            current = current.next;
        }
        window.alert(`Không tìm thấy học sinh có ID: ${studentID}`);
    }

    searchForName2() {
        const studentName2 = window.prompt("Nhập tên phụ huynh của học sinh cần tìm kiếm:");
        let current = this.head;
        while (current !== null) {
            if (current.data.name2 === studentName2) {
                const studentInfo = `
                    Tên: ${current.data.name} 
                    Tuổi: ${current.data.age} 
                    Địa chỉ: ${current.data.address} 
                    Tình trạng sức khỏe: ${current.data.heath} 
                    Số ID: ${current.data.ID} 
                    Tên phụ huynh: ${current.data.name2} 
                    Số điện thoại: ${current.data.numberphone} 
                    Nghề nghiệp: ${current.data.job} 
                `;
                window.alert(studentInfo);
                return;
            }
            current = current.next;
        }
        window.alert(`Không tìm thấy phụ huynh của học sinh có tên: ${studentName2}`);
    }
}

const studentLinkedList = new StudentLinkedList();
