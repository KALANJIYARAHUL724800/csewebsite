import React, { useEffect, useState } from "react";
import {
	getStudentsDetails,
	searchEnrollNoRecord,
	searchMobileNoRecord,
} from "../index";
import { useNavigate } from "react-router-dom";
const ViewStudentComponent = () => {
	const [students, setStudents] = useState([]);
	const [filteredStudents, setFilteredStudents] = useState([]);
	const [message, setMessage] = useState("");
	const navigate = useNavigate();
	useEffect(() => {
		getStudentsDetails()
			.then((response) => {
				setStudents(response.data);
				setFilteredStudents(response.data);
			})
			.catch((error) => {
				setMessage("Error fetching students details");
			});
	}, []);

	const enRollNo = async (enrollNo) => {
		try {
			const res = await searchEnrollNoRecord(enrollNo);
			if (res.data) {
				setFilteredStudents([res.data]);
				setMessage("");
			} else {
				setFilteredStudents([]);
				setMessage("No student found with this Enroll No");
			}
		} catch (error) {
			setFilteredStudents([]);
			setMessage("Error searching by Enroll No");
		}
	};

	const mobileNo = async (mobile) => {
		try {
			const res = await searchMobileNoRecord(mobile);
			if (res.data) {
				setFilteredStudents([res.data]);
				setMessage("");
			} else {
				setFilteredStudents([]);
				setMessage("No student found with this Mobile No");
			}
		} catch (error) {
			setFilteredStudents([]);
			setMessage("Error searching by Mobile No");
		}
	};

	const handleEnrollInput = (e) => {
		const val = e.target.value.slice(0, 6);
		e.target.value = val;
		if (val.length === 6) {
			enRollNo(val);
		} else if (val.length === 0) {
			setFilteredStudents(students);
			setMessage("");
		}
	};

	const handleMobileInput = (e) => {
		const val = e.target.value.slice(0, 10);
		e.target.value = val;
		if (val.length === 10) {
			mobileNo(val);
		} else if (val.length === 0) {
			setFilteredStudents(students);
			setMessage("");
		}
	};

	return (
		<div className="container mt-4">
			<button
				className="btn btn-outline-secondary"
				onClick={() => {
					navigate("/dashboard");
				}}>
				<i className="bi bi-arrow-left"></i> Go Back
			</button>
			<div className="d-flex py-3 align-items-center">
				<h3 className="heading me-3" style={{ color: "#004aad" }}>
					Students Details
				</h3>
				<input
					type="number"
					placeholder="Search by EnrollNo"
					className="me-2"
					onInput={handleEnrollInput}
				/>
				<input
					type="number"
					placeholder="Search by Mobileno"
					onInput={handleMobileInput}
				/>
			</div>

			{/* Pop-up message div */}
			{message && (
				<div className="alert alert-warning" role="alert">
					{message}
				</div>
			)}

			<table className="table table-bordered table-striped">
				<thead className="heading">
					<tr>
						<th className="header-icon" style={{ color: "#004aad" }}>
							S.No
						</th>
						<th className="header-icon" style={{ color: "#004aad" }}>
							Name
						</th>
						<th className="header-icon" style={{ color: "#004aad" }}>
							Enroll No
						</th>
						<th className="header-icon" style={{ color: "#004aad" }}>
							Email
						</th>
						<th className="header-icon" style={{ color: "#004aad" }}>
							Mobile
						</th>
						<th className="header-icon" style={{ color: "#004aad" }}>
							Gender
						</th>
						<th className="header-icon" style={{ color: "#004aad" }}>
							Address
						</th>
					</tr>
				</thead>
				<tbody className="para">
					{filteredStudents.length === 0 ? (
						<tr>
							<td colSpan="7" className="text-center">
								No students found.
							</td>
						</tr>
					) : (
						filteredStudents.map((student, index) => (
							<tr key={student.email || index}>
								<td>{index + 1}</td>
								<td>{student.name}</td>
								<td>{student.enrollNo || "-"}</td>
								<td>{student.email}</td>
								<td>{student.mobile || "-"}</td>
								<td>{student.gender || "-"}</td>
								<td>{student.address || "-"}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default ViewStudentComponent;
